import 'semantic-ui-css/semantic.min.css'
import {
  Modal,
  Button,
  Icon
} from 'semantic-ui-react'


export default ({message }) => (

  <Modal open closeOnDimmerClick closeOnDocumentClick closeIcon>
      <Modal.Header>Error</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {message}
        </Modal.Description>
      </Modal.Content>
    </Modal>

)
