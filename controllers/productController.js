
// Fetch all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products); // Consider returning an empty array if no products found
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
};

// Add a product
exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;

        // Basic input validation
        if (!name || !price || !quantity) {
            return res.status(400).json({ error: 'Name, price, and quantity are required' });
        }

        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'An error occurred while adding the product' });
    }
};

// View an individual product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'An error occurred while fetching the product' });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            const { name, price, quantity } = req.body;

            // Basic input validation
            if (!name || !price || !quantity) {
                return res.status(400).json({ error: 'Name, price, and quantity are required for update' });
            }

            await product.update(req.body);
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'An error occurred while updating the product' });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            await product.destroy();
            res.status(204).send(); // No content response
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'An error occurred while deleting the product' });
    }
};
