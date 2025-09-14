import Node from './noode.js';




export default class Tree{
    constructor(array){
        {
    // This creates one single array that is both sorted and has unique values.
    const sortedUniqueArray = [...new Set(array.sort((a, b) => a - b))];

    // This clean array is then passed to build the tree.
    this.root = this.buildTree(sortedUniqueArray);
    
}

    }


    buildTree(array){
        
        if  (!array || array.length === 0){ 
                return null};


        const mid = Math.floor(array.length/2);//find the middle index
        const node = new Node(array[mid]);//create a new node with the middle element
        node.left = this.buildTree(array.slice(0, mid));//recursively build the left subtree
        node.right = this.buildTree(array.slice(mid + 1));//recursively build the right subtree
        return node;//return the node

    }



prettyPrint  (node = this.root, prefix = '', isLeft = true)  {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};


 insert(data) {

    if (this.root === null)
        this.root = new Node(data);
    else
        this.root = this.insertNode(this.root, data);
};

insertNode(node, data) {
    if (node === null) {
        return new Node(data);
    }
    let root = node;
    // Duplicates not allowed
    if (root.data === data)
        return root;

    if (data < root.data)
        root.left = this.insertNode(root.left, data);
    else if (data > root.data)
        root.right = this.insertNode(root.right, data);

    return root;
}

// A utility function to do inorder
// tree traversal
 inorder(root) {
    if (root !== null) {
        this.inorder(root.left);
       
        console.log(root.data + " ");
       
        this.inorder(root.right);
    }
}



preOder(root) {
    if (root !== null) {
       
        console.log(root.data + " ");   // data part of node
       
        this.preOder(root.left);    // traverse left subtree
       
        this.preOder(root.right); // traverse right subtree
    }
}


postOder(root) {
    if (root !== null) {
       
        this.postOder(root.left);    // traverse left subtree
        this.postOder(root.right); // traverse right subtree
        console.log(root.data + " ");   // data part of node
    }
}




delete(data) {

    this.root = this.deleteNode(this.root, data);
}


deleteNode(node, data) {

   if (node === null) {
        return node;
    }  
    if (data < node.data) {
        node.left = this.deleteNode(node.left, data);
    } 
    else if (data > node.data) {
        node.right = this.deleteNode(node.right, data);
    } 
    else {

        //  case 1: Node with only one child or no child
          if (node.left === null  && node.right === null) {
            return  node = null;
        }
        // case 2: Node with only one child
        else if (node.left === null) {
            return node = node.right;
        } else if (node.right === null) {
            return node = node.left;
        }

        // case 3: Node with two children: Get the inorder successor (smallest in the right subtree)
        node.data = this.minValue(node.right);

        // Delete the inorder successor
        node.right = this.deleteNode(node.right, node.data);
    }
    return node;
}

minValue(node) {

     // iitialze minValue to node.data
    let minValue = node.data;

    // loop down to find the leftmost leaf
    while (node.left !== null) {
        minValue = node.left.data;
        node = node.left;     
    }
    return minValue;
}

find (data) {
    return this.findNode(this.root, data);
}

findNode(node, data) {
    if (node === null) {
        return null;
    }
    if (data === node.data) {
        return node;
    }
    if (data < node.data) {
        return this.findNode(node.left, data);
    } else  {
        return this.findNode(node.right, data);
    }
}


// this is Iterative version of level order traversal


levelOrderForEach(callback) {
    // if callback is not a function,  throw an error 
  if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
    }

    // if root is null return
    if (this.root === null) {
        return;
    }

    // initialize an empty queue and add root node to the queue
    const queue = [];
    queue.push(this.root);

// while the queue is not empty
    while (queue.length > 0) {
        // remove the first node from the queue
        const currentNode = queue.shift();
        // apply the callback function to the current node's data
        callback(currentNode.data);
        // add the left child to the queue if it exists
        if (currentNode.left !== null) {
            queue.push(currentNode.left);
        }
        // add the right child to the queue if it exists
        if (currentNode.right !== null) {
            queue.push(currentNode.right);
        }
    }
}
// recursive version of level order traversal

levelOrderForEachRecursive(callback) {

    if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
    }
    if (this.root=== null) {
        return;
    }

    return this.levelOrderHelper_Recursive([this.root], callback);
}
levelOrderHelper_Recursive(queue, callback) {
    if (queue.length === 0) {
        return;
    }

    // Create a new queue to store the next level of nodes
    const nextLevel = [];

    // Process the current level of nodes
    while (queue.length > 0) {
        const currentNode = queue.shift();
        callback(currentNode.data);

        if (currentNode.left) {
            nextLevel.push(currentNode.left);
        }

        if (currentNode.right) {
            nextLevel.push(currentNode.right);
        }
    }

    // Recursively call the helper function with the next level of nodes
    this.levelOrderHelper_Recursive(nextLevel, callback);
}


height(node) {
    if (!node) {
        return  0; // height of empty tree is 0
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
}


depth(data) {

    if (this.root === null) {
        return  null; // Tree is empty
    }

    let depth = 0;
    let currentNode = this.root;

    while (currentNode !== null) {
        if (currentNode.data === data) {
            return depth;
        } else if (data < currentNode.data) {
            currentNode = currentNode.left;
        } else {
            currentNode = currentNode.right;
        }
        depth++;
    }

    return null; // Value not found
}


isBalanced() {

        if (this.root === null) {
            return true; // An empty tree is balanced
        }
        const leftHeight = this.height(this.root.left);
        const rightHeight = this.height(this.root.right);

      if (leftHeight === -1) return -1; // Propagate unbalance

       if (rightHeight === -1) return -1; // Propagate unbalance
       if (Math.abs(leftHeight - rightHeight) > 1) return -1; // Unbalanced
        
        Math.max(leftHeight, rightHeight) + 1; // Balanced

       return this.isBalanced() !== -1; // If -1 was returned, tree is unbalanced
}



/**
   * Rebalances the tree by rebuilding it from its in-order traversal.
   */
  rebalance() {
    const inorderNodes = this.inorder();
    this.root = this.buildTree(inorderNodes);
  }

  
  }



