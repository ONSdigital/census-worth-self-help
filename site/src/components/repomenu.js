import React from "react"
import MenuLink from "./menulink"

export default ({
  menutree
}) => {
  console.log(menutree)
  let menuLinks = menutree.map(( menu_node ) => (
    <MenuLink key={menu_node.title} link={menu_node.link} title={menu_node.title} hidden_nodes={menu_node.children}></MenuLink>
  ))

  return (
    <div>
      {menuLinks}
    </div>
  )
}
