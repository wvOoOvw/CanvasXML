const tree = {
  alternate: "root",
  children: [
    {
      alternate: null,
      children: [
        { alternate: "div-1-1", children: [{}] },
        { alternate: "div-1-2", children: [{}] },
      ],
    },

    {
      alternate: "div",
      children: [
        { alternate: "div-2-1", children: [{}] },
        { alternate: "div-2-1", children: [{}] },
      ],
    },

    {
      alternate: null,
      children: [
        { alternate: null, children: [{}] },
        { alternate: null, children: [{ alternate: "div-3-1", children: [] }] },
      ],
    },
  ],
};

// 只保留alternate为字符串的节点，包括所有的子节点，输出一颗新树

const filterTree = (tree) => {
  if (!tree.alternate) return;

  while (tree.children.some((i) => i && typeof i.alternate !== "string")) {
    tree.children.forEach((i, index) => {
      if (typeof i.alternate !== "string") {
        tree.children[index] = i.children;
      }
    });

    tree.children = tree.children.flat().filter(Boolean);
  }

  return {
    alternate: tree.alternate,
    children: tree.children.map(filterTree).filter(Boolean),
  };
};


console.log(filterTree(tree))