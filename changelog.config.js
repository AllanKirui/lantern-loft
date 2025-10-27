const { execSync } = require("child_process")
const { format } = require("date-fns")
const { readFileSync } = require("fs")
const { resolve } = require("path")

module.exports = {
  writerOpts: {
    transform(commit) {
      const commitHash = commit.hash?.substring(0, 7)
      let formattedDate = ""
      let sortableDate = 0

      try {
        // Get the author date for this commit
        const dateRaw = execSync(`git show -s --format=%ai ${commitHash}`)
          .toString()
          .trim()

        // Example: "2025-10-24 01:02:26 +0300"
        const dateObj = new Date(dateRaw)
        sortableDate = dateObj.getTime()
        formattedDate = format(dateObj, "EEE, MMM dd, yyyy • hh:mm:ss a XXX")
      } catch {
        formattedDate = "Unknown Date"
      }

      // Map commit types to emoji sections
      const typeMap = {
        feat: "✨ Features",
        fix: "🐛 Bug Fixes",
        docs: "📝 Documentation Updates",
        refactor: "🔨 Refactoring",
        test: "✅ Tests",
        chore: "📦 Chores"
      }

      const section = typeMap[commit.type] || "Other Changes"

      return {
        ...commit,
        section,
        shortHash: commitHash,
        formattedDate,
        sortableDate // used for proper chronological sorting
      }
    },

    groupBy: "section",
    commitGroupsSort: "title",

    // Sort commits from oldest → newest by sortableDate
    commitsSort: (a, b) => {
      const da = a.sortableDate || 0
      const db = b.sortableDate || 0
      if (da !== db) return da - db // oldest first

      // Fallback sorting if dates match
      const subjectA = (a.subject || "").toString()
      const subjectB = (b.subject || "").toString()
      const cmp = subjectA.localeCompare(subjectB)
      if (cmp !== 0) return cmp
      return (a.hash || "").toString().localeCompare((b.hash || "").toString())
    },

    // Templates
    mainTemplate: readFileSync(
      resolve(__dirname, "changelog-template.hbs"),
      "utf-8"
    ),
    headerPartial: "",
    commitPartial:
      "- {{header}}\n  ([{{shortHash}}](/{{hash}}))<br/>_{{formattedDate}}_\n",
    footerPartial: ""
  }
}
