import React, { useEffect, useState } from 'react';
import { useStore } from '../../context/context';

function AddInventoryModal(props) {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(1);
    const { selection: product } = useStore(s => s);

    const onConfirm = () => {
        props.callback(value);
    }

    return (
        <div id="addInventoryModal" className="modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                {
                    product &&
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Adicionar Produto ao Estoque</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <div>
                                Produto: <span className="text-primary">{product.name}</span>
                            </div>
                            <div>
                                Em Estoque: <span className="text-primary">{product.stock}</span> unidade(s)
                            </div>
                            <div className="mb-3 d-flex justify-content-start">
                                <label
                                    className="form-label "
                                    htmlFor="inventoryAddAmount"
                                >Quantdade</label>
                                <input
                                    className="form-control "
                                    onChange={({ target: { value } }) => {
                                        setValue(parseInt(value));
                                    }}
                                    value={value}
                                    type="number" min={1}
                                    id="inventoryAddAmount" />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                onClick={() => {

                                }}
                                type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                }}
                                disabled={loading || value == null}
                                type="button" className="btn btn-primary">
                                Adicionar
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}


export default AddInventoryModal;