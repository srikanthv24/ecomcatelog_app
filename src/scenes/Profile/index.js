import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
// import ProfileImg from "./../../assets/thumbnail-profile-pic.png";
import ProfileImg from "../../assets/thumbnail-profile-pic.png";


export const Profile = () => {
    const userDetails = useSelector((state) => state.auth.userDetails);
    return (
        <Container fluid>
            <Row  className="bg-1">
                <Col  style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"200px"}}>
                    <img src="https://ui-avatars.com/api/?name=Ania+Bista&background=A1A1A1&color=FFFFFF&rounded=true" 
                        width="150" 
                        style={{borderRadius:"200px"}}
                        />
                </Col>
            </Row>
            {userDetails?.name && (
                <>
                    <Row>
                    <Col className='value-txt'>Name</Col>
                </Row>
                 <Row>
                     <Col className='value-txt clr-black'>{userDetails?.name}</Col>
                 </Row>
                </>
            )
            }
             {userDetails?.phone_number && (
                <>
                 <Row>
                <Col className='value-txt'>Mobile</Col>
            </Row>
            <Row>
            <Col className='value-txt clr-black'>{userDetails?.phone_number}</Col>
            </Row>
               </>
                )
            }
            <Row>
            <Col className='value-txt'>Email</Col>
            </Row>
            <Row>
            <Col className='value-txt clr-black'>test@gmail.com</Col>
            </Row>
            <Row>
            <Col className='value-txt'>Address</Col>
            </Row>
            <Row>
                <Col className='value-txt clr-black'>H.no: 1234, Hyderabad, India</Col>
            </Row>
        </Container>
    )
}