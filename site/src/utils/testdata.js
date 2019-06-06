export const data = {
  edges: [
	  { node : {
	  		frontmatter: {
	  			title: "testArticle1",
	  			description: "testDescription",
	  			priority: 1,
	  			date: new Date(),
	  		},
	  		fields: {
	  			pagename: "test1",
	  			collection: "articles"
	  		}
	  	}
	  },
	  { node : {
	  		frontmatter: {
	  			title: "testArticle2",
	  			description: "testDescription",
	  			priority: 0,
	  			date: new Date(),
	  		},
	  		fields: {
	  			pagename: "test",
	  			collection: "articles"
	  		}
	  	}
	  },
	  { node : {
	  		frontmatter: {
	  			title: "testDirectory3",
	  			description: "testDescription",
	  			priority: 0,
	  			date: new Date()
	  		},
	  		fields: {
	  			pagename: "test",
	  			collection: "directories"
	  		}
	  	}
	  }]
}

export const articleNode = data.edges[0].node
export const directoryNode = data.edges[2].node
export const articleList = { edges: data.edges.slice(0, 2) }