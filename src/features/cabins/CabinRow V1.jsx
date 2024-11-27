import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

CabinRow.propTypes = {
  id: PropTypes.number,
  cabin: PropTypes.object,
  name: PropTypes.string,
  maxCapacity: PropTypes.number,
  regularPrice: PropTypes.number,
  discount: PropTypes.number,
  description: PropTypes.string,
  image: PropTypes.string,
};

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createNewCabin } = useCreateCabin();

  const { id, name, regularPrice, discount, maxCapacity, image } = cabin;

  function handleDuplicate() {
    createNewCabin({
      name: `copy of ${name}`,
      regularPrice,
      discount,
      maxCapacity,
      image,
    });
  }

  return (
    <Table.Row columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button onClick={handleDuplicate} disabled={isCreating}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit-cabin">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit-cabin">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens="delete-cabin">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-cabin">
            <ConfirmDelete
              resourceName="cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(id)}
            />
          </Modal.Window>
        </Modal>

        <Menus.Menu>
          <Menus.Toggle id={id} />

          <Menus.List id={id}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>

            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>

            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
