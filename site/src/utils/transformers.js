export const transformQueryDataToArticleData = function(edges)
{
	return edges.map(
    	({ node }) => {
    		 return {
    		 	title : node.frontmatter.title,
		        parent_title : node.frontmatter.directory,
		        description : node.frontmatter.description,
		        date: node.frontmatter.date,
		        link: node.fields.pagename,
		        type: "article" }
	    })
}