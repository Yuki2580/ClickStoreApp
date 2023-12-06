import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ImageForList = (props) => {

  const buy = () => {
    console.log('buy');
  };

  return (
    <div>
    <Card style={{ width: '12rem' }}>
      <Card.Img variant="top" style={{width: '12rem', height: '12rem'}} src={props.image} />
      <Card.Body>
        <Card.Title>{props.id}</Card.Title>
        <Button onClick = {buy}>List</Button>
      </Card.Body>
    </Card>
    </div>
  );

};

export default ImageForList;
