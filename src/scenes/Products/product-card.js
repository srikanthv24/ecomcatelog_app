/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createCart,
  updateCart,
  updateCartQty,
} from "../../store/actions/cart";

const ProductCard = ({ product }) => {
  const history = useHistory();
  const Cart = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const [ExistingProduct, setExistingProduct] = useState({ qty: 0 });
  const userDetails = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    Cart.cartDetails &&
      Cart?.cartDetails?.items?.length &&
      Cart?.cartDetails?.items[0]?.items.map((item, index) => {
        // eslint-disable-next-line no-unused-expressions
        item && item.item_id == product.id
          ? setExistingProduct({ ...product, ...item, qty: item.qty })
          : null;
        return null;
      });
  }, [Cart.cartDetails]);

  const handleAddToCart = () => {
    console.log("Cart=?", product);
    if (Cart?.cartDetails?.items?.length && Cart?.cartDetails?.items[0]?.id) {
      dispatch(
        updateCart({
          customer_id: userDetails.sub,
          cart_id: Cart?.cartDetails?.items[0]?.id,
          item: { item_id: product.id, qty: 1, sale_val: product.sale_val },
        })
      );
    } else {
      dispatch(
        createCart({
          customer_id: userDetails.sub,
          items: [{ ...product, qty: 1 }],
          accessToken: sessionStorage.getItem("token"),
        })
      );
    }
  };

  const onIncrement = () => {
    dispatch(
      updateCartQty({
        cart_item_id: ExistingProduct.cart_item_id,
        id: Cart.cartDetails.items[0].id,
        customer_id: userDetails.sub,
        item_id: ExistingProduct.item_id,
        qty: ExistingProduct.qty + 1,
      })
    );
  };

  const onDecrement = () => {
    dispatch(
      updateCartQty({
        cart_item_id: ExistingProduct.cart_item_id,
        id: Cart.cartDetails.items[0].id,
        customer_id: userDetails.sub,
        item_id: ExistingProduct.item_id,
        qty: ExistingProduct.qty - 1,
      })
    );
  };
  return (
    <Card style={{ marginBottom: 30, borderColor:'transparent',padding:'0px',background:'transparent' }}>
      <Card.Body
        variant="top"
        onClick={() => history.push(`/products/${product.id}`)}
        className="p-2"
      >
        <div
          style={{
            backgroundImage: `url(${
              product.defaultimg_url ||
              "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
            })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "120px",
            width: "100%",
            borderRadius:"15px"
          }}
        />
      </Card.Body>
      <Card.Body
        className="pt-1 text-center px-1"
        style={{ minHeight: 140 }}
        onClick={() => history.push(`/products/${product.id}`)}
      >
        <Card.Text className="h6 mb-0 pb-0 col-12 text-truncate text-center" style={{fontSize:"15px", lineHeight:"25px",fontWeight: "700", color:"#352817", fontFamily: 'Roboto Condensed'}}>
          {product.display_name}
        </Card.Text>
        <small className="col-12 text-truncate" style={{fontSize:"15px", lineHeight:"25px",fontWeight: "400", color:"#352817", fontFamily: 'Roboto Condensed'}}>
          {product.category}
        </small>
        <Card.Text className="col-12 text-truncate" style={{fontSize:"15px", lineHeight:"25px",fontWeight: "400", color:"#352817", fontFamily: 'Roboto Condensed'}}>
          {product.description}
        </Card.Text>
        <Card.Text>
          <span className="d-flex justify-content-center" style={{fontSize:"15px",lineHeight:"20px",color:"#352817",fontWeight:"400",fontFamily: 'Roboto Condensed'}}>
            <span>
              <BiRupee /> {Number(product.sale_val).toFixed(2)} / {product.uom_name}
            </span>
          </span>
          <small className="col-12 text-truncate text-muted">
            Including{" "}
            {String(product.tax_methods).replace("Output", "").replace("-", "")}
          </small>
        </Card.Text>
      </Card.Body>
      <div style={{ marginTop: 10 }}>
        {ExistingProduct.qty ? (
          <InputGroup className="mb-3">
            <Button onClick={onDecrement} size="sm"  style={{background: '#f05922', border: 'none', color: '#FFF'}}>
              {Cart.cartLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <GrSubtract />
              )}
            </Button>
            <FormControl
              aria-label="Example text with two button addons"
              style={{ textAlign: "center" }}
              value={ExistingProduct?.qty || ""}
              type="number"
              size="sm"
              className="mb-0"
              // onChange={(ev) => setCartItem(ev.target.value)}
            />

            <Button onClick={onIncrement} size="sm" style={{background: '#f05922', border: 'none', color: '#FFF'}}>
              {Cart.cartLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <GrAdd />
              )}
            </Button>
          </InputGroup>
        ) : (
          <Button
            size="sm"
            className="cutom-btn"
            style={{
              minWidth: "140px",margin:'0 auto',display:'flex',fontSize:"15px", fontWeight:"500",fontFamily: 'Roboto Condensed',textTransform:"uppercase",
              background: 'transparent', border: '2px solid #362918', color: '#352817',borderRadius:"90px", padding:'15px',alignItems:"center",justifyContent:"space-around"
            }}
            onClick={handleAddToCart}
          >
            <AiOutlineShoppingCart />{" "}
            {Cart.cartLoading ? (
              <Spinner animation="border" role="status" />
            ) : (
              "Add to Cart"
            )}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
