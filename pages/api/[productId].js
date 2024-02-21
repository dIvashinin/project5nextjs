export default async function handler(req, res) {
    const { productId } = req.query;
  
    if (req.method === 'PUT') {
      try {


        
      }catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
      }
    } 
}