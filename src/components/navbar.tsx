"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenu,
  NavigationMenuContent,
} from "./ui/navigation-menu";

const cadastros = [
  {
    title: "Categorias",
    href: "/categories",
  },
  {
    title: "Cores",
    href: "/colors",
  },
  {
    title: "Marcas",
    href: "/brands",
  },
  {
    title: "Produtos",
    href: "/products",
  },
  {
    title: "Tamanhos",
    href: "/sizes",
  },
];

export function Navbar() {
  return (
    <NavigationMenu className="flex-1 space-x-2 mx-6">
      <NavigationMenuItem>
        <NavigationMenuTrigger>Cadastros</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="">
            {cadastros.map((item) => {
              return (
                <NavigationMenuItem key={item.title}>
                  <Link className="" href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="">
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/stock" className="w-full">
            Estoque
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
