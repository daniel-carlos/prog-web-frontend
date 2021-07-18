import create from 'zustand';
import $ from "jquery";

export const useModalStore = create(set => ({
    removeCartItemDialog: undefined,
    setRemoveCartItemDialog: () => {
        var myModal = new bootstrap.Modal(document.getElementById('removeCartItemDialog'), {
           
          });
    },
    showRemoveCartItemDialog: (show) => {
        if (show === true) {
            $('#removeCartItemDialog').modal('show')
        }else{
            $('#removeCartItemDialog').modal('hide')
        }
    },
}))