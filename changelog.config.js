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
        // ✅ Example output: "2025-10-24 01:02:26 +0300"
        formattedDate = format(
          new Date(dateRaw),
          "EEE, MMM dd, yyyy • hh:mm:ss a XXX"
        ) // e.g. Fri, Oct 24, 2025 • 01:02:26 AM +03:00
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
    commitsSort: ["scope", "subject"],

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
