const { execSync } = require("child_process")
const { format } = require("date-fns")
const { readFileSync } = require("fs")
const { resolve } = require("path")

module.exports = {
  writerOpts: {
    transform(commit) {
      const commitHash = commit.hash?.substring(0, 7)

      let formattedDate = ""
      try {
        const dateRaw = execSync(`git show -s --format=%ai ${commitHash}`)
          .toString()
          .trim()
        formattedDate = format(
          new Date(dateRaw),
          "EEE, MMM dd, yyyy • hh:mm:ss a XXX"
        )
      } catch {
        formattedDate = "Unknown Date"
      }

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
        formattedDate
      }
    },

    groupBy: "section",
    commitGroupsSort: "title",

    // ✅ Sort commits by date instead of alphabetically
    commitsSort: (a, b) => {
      const parseDate = (c) => {
        const s = c.committerDate || c.authorDate || c.date || ""
        const t = Date.parse(s)
        return Number.isFinite(t) ? t : 0
      }
      const da = parseDate(a)
      const db = parseDate(b)
      if (da !== db) return da - db // oldest first
      const subjectA = (a.subject || "").toString()
      const subjectB = (b.subject || "").toString()
      const cmp = subjectA.localeCompare(subjectB)
      if (cmp !== 0) return cmp
      return (a.hash || "").toString().localeCompare((b.hash || "").toString())
    },

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
