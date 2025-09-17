import Tree from './tree.js';

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const myTree = new Tree(array);



console.log("Tree built from array:", array);


myTree.buildTree(array);

myTree.prettyPrint();
myTree.insert(10);
console.log("Tree after inserting 10:");
myTree.prettyPrint();


myTree.insert(99);

myTree.insert(0);

myTree.insert(1000);

myTree.insert(500);

myTree.prettyPrint();

console.log("Inorder traversal:");
myTree.inorder(myTree.root);

console.log("Preorder traversal:");
myTree.preOrder(myTree.root);
console.log("Postorder traversal:");
myTree.postOder(myTree.root);
myTree.delete(67);
console.log("Tree after deleting 67:");
myTree.prettyPrint();




// 4. Find a specific node.
const valueToFind = 23;
const foundNode = myTree.find(valueToFind);
console.log(`\n--- Finding node with value: ${valueToFind} ---`);
console.log(foundNode ? `Found node: ${JSON.stringify(foundNode)}` : `Node with value ${valueToFind} not found.`);





function printNodeData(node) {
    if (node.data !== undefined) {
        console.log(node.data);
    } else if (node.value !== undefined) {
        console.log(node.value);
    } else {
        console.log(node);
    }
}

myTree.levelOrderForEachRecursive(printNodeData);


console.log("Level-order traversal (iterative):");


myTree.levelOrderForEach(printNodeData);



console.log("height of Tree")


console.log(myTree.height(myTree.root)  )


console.log("depth of tree")

console.log("lets see the values of any leaf nopde ")
console.log(myTree.depth(500)) /// 



// 6. Get height and depth of nodes.
const heightNode = myTree.find(8); // Find node with value 8 to check its height

const depthValue = 6345;

console.log("\n--- Height and Depth ---");
console.log(`Height of root: ${myTree.height(myTree.root)}`);
if (heightNode) {
    console.log(`Height of node with value 8: ${myTree.height(heightNode)}`);
}
console.log(`Depth of value ${depthValue}: ${myTree.depth(depthValue)}`);




// 7. Check if the tree is balanced.
console.log("\n--- Balance Check ---");
console.log(`Is the tree balanced? ${myTree.isBalanced()}`);

// 8. Rebalance the tree if unbalanced.
if (!myTree.isBalanced()) {
    console.log("Rebalancing the tree...");
    myTree.rebalance();
    console.log("Tree after rebalancing:");
    myTree.prettyPrint();
}   