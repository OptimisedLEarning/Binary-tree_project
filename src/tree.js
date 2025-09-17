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
// In-order traversal method
  inorder(node = this.root, result = []) {
    // *** BASE CASE ***
    // If the node is null, stop the recursion for this path.
    if (node === null) {
      return result;
    }

    // 1. Traverse the left subtree
    this.inorder(node.left, result);

    // 2. Visit the root node (e.g., add its data to the result array)
    result.push(node.data);

    // 3. Traverse the right subtree
    this.inorder(node.right, result);

    return result;
  }




preOrder(node = this.root, result = []) {
    // This is the crucial base case that stops the recursion.
    // When a leaf's child (which is null) is reached, the function simply returns.
    if (node == null) {
        return result; 
    }

    // 1. VISIT the current node
    // You process the node's data before doing anything else.
    result.push(node.data);

    // 2. Traverse the LEFT subtree
    // You make a recursive call on the left child.
    this.preOrder(node.left, result);

    // 3. Traverse the RIGHT subtree
    // After the entire left subtree is finished, you move to the right.
    this.preOrder(node.right, result); 
    
    // Finally, return the accumulated result.
    return result;
}



postOder(node = this.root, result = []) {
    if (node  === null) {
        return result ;
       }

    // 1. Traverse the LEFT subtree
    this.postOder(node.left, result);
    // 2. Traverse the RIGHT subtree
    this.postOder(node.right, result);
    // 3. VISIT the current node
    result.push(node.data);
    // Finally,
    return result;
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
        return  -1; // height of empty tree is -1
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


isBalanced(node = this.root) {


      const checkBalance = (currentNode) => {
    if (currentNode === null) {
        return true; // An empty tree is balanced
    }
    const leftHeight = checkBalance(currentNode.left);
    const rightHeight = checkBalance(currentNode.right);

      if (leftHeight === -1) return -1; // Propagate unbalance

       if (rightHeight === -1) return -1; // Propagate unbalance
       if (Math.abs(leftHeight - rightHeight) > 1) return -1; // Unbalanced

       return Math.max(leftHeight, rightHeight) + 1; // Balanced
   }

       return checkBalance(node) !== -1; // If -1 was returned, tree is unbalanced
}




/**
   * Rebalances the tree by rebuilding it from its in-order traversal.
   */
  rebalance() {
    const inorderNodes = this.inorder();

    this.root = this.buildTree(inorderNodes);
  }

  
  }






