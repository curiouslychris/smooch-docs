export function IsOrHasAncestorNode(node, ancestorNode) {
    let currentNode = node;

    while (currentNode && currentNode !== document) {
        if (currentNode === ancestorNode) {
            return true;
        }

        currentNode = currentNode.parentNode;
    }

    return false;
}
