import { Modal, Button, Table, Card } from 'react-bootstrap'

export const EntityCart: any = ({ entity, onChange }: any) => (
  <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{entity ? entity?.name : 'Name...'}</Card.Title>
      {entity && (
        <Card.Subtitle className="mb-2 text-muted">
          {entity?.street}, {entity?.city},{entity?.zip}{' '}
        </Card.Subtitle>
      )}
      <Card.Text>
        <Table>
          <thead></thead>
          <tbody>
            <tr>
              <td>ICO:</td>
              <td> {entity?.ico}</td>
            </tr>
            <tr>
              <td>DIC:</td>
              <td> {entity?.dic}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Text>
      {onChange && <Card.Link onClick={onChange}>{entity ? 'Change' : 'Select'}</Card.Link>}
    </Card.Body>
  </Card>
)

export default EntityCart
