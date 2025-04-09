import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface SaveProductProps {
    product: Product;
    onSave: (updatedProduct: Product) => void;
}

const SaveProduct: React.FC<SaveProductProps> = ({ product, onSave }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState(product);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleSaveClick = () => {
        onSave(editedProduct);
        handleCloseModal();
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Editar
            </Button>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <h2>Editar Produto</h2>
                    <form>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Nome"
                            name="name"
                            value={editedProduct.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Preço"
                            type="number"
                            name="price"
                            value={editedProduct.price}
                            onChange={handleInputChange}
                        />
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCloseModal}
                                sx={{ mr: 1 }}
                            >
                                Cancelar
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSaveClick}>
                                Salvar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default SaveProduct;