import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import PageTitle from "../components/pagetitle"
import TextBlock from "../components/textblock"
import ReportItem from "../components/admin/reportItem"
import DatePicker from "react-datepicker"
import datePickerCss from "./datePickerCss"
const moment = require("moment")

const NA = "(not set)"
const SET = "(set)"
const DRAFT = "(in draft)"
const INITIAL_STATE = {
  author: "",
  cconly: "",
  contentsource: "",
  departments: "",
  directory: "",
  draftreason: "",
  "match-author": "",
  "match-title": "",
  "match-signedby": "",
  "match-tags": "",
  optimisedby: "",
  "date-from": null,
  "date-to": null,
  roles: "",
  signedby: "",
  title: "",
}
export default class Report extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.data
    this.state = INITIAL_STATE
    this.fieldMatches = this.fieldMatches.bind(this)
    this.fieldEquals = this.fieldEquals.bind(this)
    this.fieldDateBetween = this.fieldDateBetween.bind(this)
    this.getCollectionSelect = this.getCollectionSelect.bind(this)
    this.getCollectionOptions = this.getCollectionOptions.bind(this)
    this.getFieldMatchInput = this.getFieldMatchInput.bind(this)
    this.getFieldDateBetweenSelector = this.getFieldDateBetweenSelector.bind(this)
    this.reset = this.reset.bind(this)
  }

  updateReport(fieldName) {
    return (event) => {
      this.setState({
        [fieldName]: event.target.value
      })
    }
  }

  updateReportDate(fieldName) {
    return (date) => {
      this.setState({
        [fieldName]: date
      })
    }
  }

  reset() {
    this.setState(INITIAL_STATE);
  }

  fieldMatches(fieldName, node) {
    const matchStateAttributeName = "match-" + fieldName
    return !this.state[matchStateAttributeName] ||
      (node.frontmatter[fieldName] &&
        JSON.stringify(node.frontmatter[fieldName]).toLowerCase().includes(this.state[matchStateAttributeName].toLowerCase())
      )
  }

  fieldEquals(fieldName, node) {
    const value = this.state[fieldName]
    const fieldValue = node.frontmatter[fieldName]

    return !value ||
      (Array.isArray(fieldValue) && fieldValue.includes(value)) ||
      `${node.frontmatter[fieldName]}` === value ||
      (value === DRAFT && node.frontmatter[fieldName] !== "Ready for Live Site") ||
      (value === NA && !this.isSet(node.frontmatter[fieldName])) ||
      (value === SET && this.isSet(node.frontmatter[fieldName]))
  }

  fieldDateBetween(fieldName, node) {
    const from = this.state[fieldName + "-from"]
    const to = this.state[fieldName + "-to"]
    const date = node.frontmatter[fieldName]
    if (!to && !from) {
      return true
    }
    if (!date) {
      return false
    }
    if (!to) {
      return moment(date).isAfter(moment(from));
    }
    if (!from) {
      return moment(date).isBefore(moment(to));
    }
    return moment(date).isAfter(moment(from)) && moment(date).isBefore(moment(to));
  }

  isSet(value) {
    return value !== null && value !== ""
  }

  getFieldMatchInput(fieldName) {
    const matchStateAttributeName = "match-" + fieldName
    return (<input
      css={css`
          margin: 0em 1em;
        `}
      id={"report-match-" + fieldName}
      maxLength="30"
      size={30}
      type="text"
      value={this.state[matchStateAttributeName]}
      onChange={this.updateReport(matchStateAttributeName).bind(this)}
    />)
  }

  getCollectionOptions(fieldName) {
    if (fieldName === "cconly")
      return (
        ["true","false"].map(( value ) => (
          <option key={value}>{value}</option>
        ))
      )
    if (["author","contentsource", "signedby"].includes(fieldName))
      return (<option hidden key={fieldName + "-option/hidden"}/>)
    return this.data[fieldName].edges.map(({ node }) => (
      <option
        key={fieldName + "-option/" + node.fields.pagename}
      >{node.frontmatter.title}</option>
    ))
  }

  getCollectionSelect(fieldName) {
    return (<select
        id={"report-select-" + fieldName}
        value={this.state[fieldName]}
        onChange={this.updateReport(fieldName).bind(this)}
        css={css`
          margin: 0em 1em;
        `}
      >
        <option/>
        <option>{NA}</option>
        <option>{SET}</option>
        {fieldName === "draftreason" && <option>{DRAFT}</option>}
        {this.getCollectionOptions(fieldName)}
      </select>
    )
  }

  getFieldDateBetweenSelector(fieldName) {
    return (<span css={datePickerCss}>
      <DatePicker
        id={"report-select-" + fieldName + "-from"}
        selected={this.state[fieldName + "-from"]}
        onChange={this.updateReportDate(fieldName + "-from").bind(this)}
        dateFormat={"dd/MM/yyyy"}
      />
      <DatePicker
        id={"report-select-" + fieldName + "-to"}
        selected={this.state[fieldName + "-to"]}
        onChange={this.updateReportDate(fieldName + "-to").bind(this)}
        dateFormat={"dd/MM/yyyy"}
      />
    </span>)
  }

  render() {
    const stateKeys = Object.keys(this.state)
      .filter(key => this.state[key])
    const fieldNamesSearched = Array.from(new Set(stateKeys.map(key =>
      key.startsWith("match-") ? key.substring(6) :
        key.startsWith("date-") ? "date" : key
    )))

    const items = this.data.allItems.edges
      .filter(({ node }) => {
        return this.fieldEquals("author", node) &&
          this.fieldEquals("cconly", node) &&
          this.fieldEquals("contentsource", node) &&
          this.fieldEquals("departments", node) &&
          this.fieldEquals("directory", node) &&
          this.fieldEquals("draftreason", node) &&
          this.fieldEquals("optimisedby", node) &&
          this.fieldEquals("roles", node) &&
          this.fieldEquals("signedby", node) &&
          this.fieldMatches("author", node) &&
          this.fieldMatches("signedby", node) &&
          this.fieldMatches("title", node) &&
          this.fieldMatches("tags", node) &&
          this.fieldDateBetween("date", node)
      }).map(({ node }) => (
      <ReportItem
          key={node.fields.collection + "/" + node.fields.pagename}
          node={node}
          fieldNames={fieldNamesSearched}/>
    ))

    const filterAsString = stateKeys
      .map(key => {
        const value = this.state[key]
        const valueAsString = key.includes("date") ?
          moment(value).format("D MMM YY") : value
        return (
          <li key={"state/" + key}>{key} = {valueAsString}</li>
        )
      })

    const count = items.length;
    return (
      <div>
        <TextBlock>
          <div css={css`
            border: 1px solid #555;
            padding: 1em;
          `}>
            <div>
              Title{this.getFieldMatchInput("title")}
            </div>
            Call&nbsp;Centre&nbsp;Only{this.getCollectionSelect("cconly")}
            Draft&nbsp;Reasons{this.getCollectionSelect("draftreason")}
            <div>Related&nbsp;Team(s){this.getCollectionSelect("departments")}</div>
            Content&nbsp;Source{this.getCollectionSelect("contentsource")}
            Role(s){this.getCollectionSelect("roles")}
            Directory{this.getCollectionSelect("directory")}
            <div>
              Author{this.getCollectionSelect("author")}
              {this.getFieldMatchInput("author")}
            </div>
            Optimised&nbsp;By{this.getCollectionSelect("optimisedby")}
            <div>
              Signed&nbsp;By{this.getCollectionSelect("signedby")}
              {this.getFieldMatchInput("signedby")}
            </div>
            <div>
              Tags{this.getFieldMatchInput("tags")}
            </div>
            <div>Between Dates {this.getFieldDateBetweenSelector("date")}</div>
            <div css={css`
              text-align:right;
            `}><button css={css`font-size:1.5em;`} onClick={this.reset}>Reset</button></div>
          </div>
          <PageTitle>
            CMS content report : {count} item{(count !== 1) && <span>s</span>}
          </PageTitle>
          <div css={css`
            text-align:right;
          `}>{moment().format("DD MMM YYYY @ hh:mm")}</div>
          <ul>{filterAsString}</ul>
          {items}
        </TextBlock>
      </div>
    )
  }
}

export const query = graphql`
  query {
    allItems: allMarkdownRemark(
      sort: { fields: frontmatter___title }
      filter: { fields: { collection: { eq: "articles" } } }
    ) {
      totalCount
      edges {
        node {
          ...BaseArticleFields
          frontmatter {
            author
            cconly
            contentsource
            date
            departments
            draftreason
            optimisedby
            roles
            signedby      
            tags 
          }
        }
      }
    }
    roles: allMarkdownRemark(
      sort: { fields: frontmatter___title }
      filter: { fields: { collection: { eq: "roles" } } }
    ) {
      edges {
        node {
          fields {
            pagename
          }          
          frontmatter {
            title
          }
        }
      }
    }  
    draftreason: allMarkdownRemark(
      sort: { fields: frontmatter___title }
      filter: { fields: { collection: { eq: "draftreason" } } }
    ) {
      edges {
        node {
          fields {
            pagename
          }          
          frontmatter {
            title
          }
        }
      }
    } 
    departments : allMarkdownRemark(
      sort: { fields: frontmatter___title }
      filter: { fields: { collection: { eq: "departments" } } }
    ) {
      edges {
        node {
          fields {
            pagename
          }          
          frontmatter {
            title
          }
        }
      }
    } 
    directory : allMarkdownRemark(
      sort: { fields: frontmatter___title }
      filter: { fields: { collection: { eq: "directories" } } }
    ) {
      edges {
        node {
          fields {
            pagename
          }          
          frontmatter {
            title
          }
        }
      }
    }       
    optimisedby : allMarkdownRemark(
      sort: { fields: frontmatter___title }
      filter: { fields: { collection: { eq: "optimisedby" } } }
    ) {
      edges {
        node {
          fields {
            pagename
          }          
          frontmatter {
            title
          }
        }
      }
    }  
  }
`
