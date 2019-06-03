export const transformQueryDataToArticleData = function(edges)
{
	return edges.map(
    	({ node }) => {
    		 return {
    		 	title : node.frontmatter.title,
		        parent_title : node.frontmatter.directory,
		        link: node.fields.pagename,
		        type: "article" }
	    })
}