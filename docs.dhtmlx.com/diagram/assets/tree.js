function expandRec(item) {
    item.classList.add("tree-item__expanded");
    item.classList.remove("tree-item__search-invisible");
    const parentUl = item.parentNode;
    if (parentUl.parentNode.id !== "doc_navigation") {
        expandRec(parentUl.parentNode)
    }
}

function onExpandClick(ev) {
    const branch = ev.target.parentNode;
    if (branch.classList.contains("tree-item__expanded")) {
        branch.classList.remove("tree-item__expanded");
        ev.target.innerText = " + ";
    }
    else {
        branch.classList.add("tree-item__expanded");
        ev.target.innerText = " - ";
    }
}

function setStyles(tree){
    const lis = tree.querySelectorAll("li");
    for (const li of lis) {
        li.classList.add("tree-item");
        const childsGroup = li.querySelector("ul");
        if (childsGroup) {
            childsGroup.classList.add("tree-group");
            li.classList.add("tree-branch");
            const span = document.createElement("span");
            span.className = "tree-branch--expand-icon";
            span.innerText = " + ";
            span.addEventListener("click", onExpandClick);
            li.prepend(span);
        }
    }
}





