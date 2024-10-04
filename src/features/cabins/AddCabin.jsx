import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    
    return (
        <>
        
        <Button onClick={() => setIsOpenModal(show => !show)}>
            Add New Cabin
        </Button>
            {isOpenModal && 
            <Modal onClose={() => setIsOpenModal(false)} >
                <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
            </Modal>}
        </>
    )
}

export default AddCabin
