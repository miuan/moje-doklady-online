import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap'

export interface IDeleteModalParams {
  show: boolean
  onHide: () => void
  onSelect: (item: any) => void
  category?: string
  deleteObject?: any
  deleting?: boolean
  data: any[]
}

export const CustomerSelectModal: React.FC<IDeleteModalParams> = ({ show, onHide, onSelect, category, deleteObject, deleting, children, data }: any) => {
  const onDeleteAction = () => {}

  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <div>
            <Modal.Title>Select Customer</Modal.Title>
          </div>
        </Modal.Header>

        <Modal.Body>
          {data && (
            <Table responsive striped hover>
              <thead>
                <tr>{children[0]}</tr>
              </thead>
              <tbody>
                {data.map((item: any, index: number) => (
                  <tr style={{ cursor: 'pointer' }} onClick={() => onSelect(item)}>
                    {children[1](index + 1, item)}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button disabled={deleting} variant="danger" type="submit" onClick={onDeleteAction}>
            Delete
          </Button>
          <Button disabled={deleting} variant="primary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CustomerSelectModal
