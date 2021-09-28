import React, { useEffect, useState } from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateCart, updateCartQty } from "../../store/actions/cart";

const ProductCard = ({ product }) => {
  const history = useHistory();
  const Cart = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const [ExistingProduct, setExistingProduct] = useState({ qty: 0 });

  useEffect(() => {
    Cart.cartDetails &&
      Cart.cartDetails.items[0].items.map((item, index) => {
        // eslint-disable-next-line no-unused-expressions
        item && item.item_id == product.id
          ? setExistingProduct({ ...product, ...item, qty: item.qty })
          : null;
        return;
      });
  }, [Cart.cartDetails]);

  const handleAddToCart = () => {
    console.log("Cart=?", product);
    dispatch(
      updateCart({
        customer_id: "2b534ed8-809a-4fb5-937c-c8f29c994b16",
        cart_id: Cart.cartDetails.items[0].id,
        item: { item_id: product.id, qty: 1, sale_val: product.sale_val },
      })
    );
  };

  const onIncrement = () => {
    dispatch(
      updateCartQty({
        id: Cart.cartDetails.items[0].id,
        customer_id: "2b534ed8-809a-4fb5-937c-c8f29c994b16",
        item_id: ExistingProduct.item_id,
        qty: ExistingProduct.qty + 1,
      })
    );
  };

  const onDecrement = () => {
    dispatch(
      updateCartQty({
        id: Cart.cartDetails.items[0].id,
        customer_id: "2b534ed8-809a-4fb5-937c-c8f29c994b16",
        item_id: ExistingProduct.item_id,
        qty: ExistingProduct.qty - 1,
      })
    );
  };
  return (
    <Card style={{ marginBottom: 10 }}>
      <Card.Body
        variant="top"
        onClick={() => history.push(`/products/${product.id}`)}
        className="p-1"
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
          }}
        />
      </Card.Body>
      <Card.Body
        className="pt-2"
        style={{ minHeight: 140 }}
        onClick={() => history.push(`/products/${product.id}`)}
      >
        <Card.Text className="h6 mb-0 pb-0 col-12 text-truncate">
          {product.display_name}
        </Card.Text>
        <small className="col-12 text-truncate text-muted">
          {product.category}
        </small>
        <Card.Text className="col-12 text-truncate">
          {product.description}
        </Card.Text>
        <Card.Text>
          <span className="d-flex">
            <BiRupee /> {Number(product.sale_val).toFixed(2)} /{" "}
            {product.uom_name}
          </span>
          <small className="col-12 text-truncate text-muted">
            Including{" "}
            {String(product.tax_methods).replace("Output", "").replace("-", "")}
          </small>
        </Card.Text>
      </Card.Body>
      <Card.Footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "transparent",
        }}
      >
        {ExistingProduct.qty ? (
          <InputGroup className="mb-3">
            <Button variant="outline-secondary" onClick={onDecrement}>
              <GrSubtract />
            </Button>
            <FormControl
              aria-label="Example text with two button addons"
              style={{ textAlign: "center" }}
              value={ExistingProduct?.qty || ""}
              type="number"
              // onChange={(ev) => setCartItem(ev.target.value)}
            />

            <Button variant="outline-secondary" onClick={onIncrement}>
              <GrAdd />
            </Button>
          </InputGroup>
        ) : (
          <Button size="sm" style={{ width: "100%" }} onClick={handleAddToCart}>
            <AiOutlineShoppingCart /> Add to Cart
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
