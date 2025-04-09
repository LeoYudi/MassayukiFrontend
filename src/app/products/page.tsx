'use client';

import { useEffect, useState } from 'react';
import { ProductType } from '../../types/products';
import { api } from '@/utils/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(2),
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/products');
        if (response.data) setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleEditClick = (product: ProductType) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveChanges = () => {
    // Atualiza o produto na lista (simulação)
    if (selectedProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id ? selectedProduct : product
        )
      );
    }
    handleCloseModal();
  };

  return (
    <div>
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        {products.map((product) => (
          <StyledCard key={product.id}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2">
                <strong>Preço:</strong> R$ {Number(product.price).toFixed(2)}
              </Typography>
              <Typography variant="body1">
                <strong>Categoria:</strong> {product.category.name}
              </Typography>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={2} 
              style={{ transform: 'translateY(-65px)' }}>
              
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditClick(product)}
                >
                  
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => console.log(`Excluindo produto ${product.id}`)}
                >
                 
                </Button>
              </Box>
            </CardContent>
          </StyledCard>
        ))}
      </Box>

      {/* Modal para edição */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            Editar Produto
          </Typography>
          {selectedProduct && (
            <Box component="form" display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Nome"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, name: e.target.value })
                }
              />
              <TextField
                label="Preço"
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: parseFloat(e.target.value),
                  })
                }
              />
              <TextField
                label="Categoria"
                value={selectedProduct.category.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    category: { ...selectedProduct.category, name: e.target.value },
                  })
                }
              />
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button variant="outlined" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                  Salvar
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
}