import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../store/actions/products";
import { useParams } from "react-router-dom";
import ProductPlanner from "./product-planner";
import { GrAdd, GrSubtract } from "react-icons/gr";
import {
  updateCardItem,
} from "../../store/actions/cart-item";
import { updateCart } from "../../store/actions/cart";
import { FormProvider, useFormContext } from "react-hook-form";

const ProductDetails = ({
  control,
  productId,
  isOnboarding = false,
  myRef = null,
}) => {
  let productID = "";
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const Cart = useSelector((state) => state.Cart);
  const [ProductDetails, setProductDetails] = useState({});
  const [CartItem, setCartItem] = useState(1);
  const [ExistingProduct, setExistingProduct] = useState({ qty: 0 });
  const methods = useFormContext();
  const { handleSubmit, setValue } = methods;

  const [FormData, setFormData] = useState({
    cart_id: "",
    item_id: "",
    qty: 0,
    subscription_data: {
      customer_id: "30fa6997-8d8f-4f8b-ba8e-d85c7c821ecf",
      customer_name: "CK",
      is_mealplan: false,
      item_id: "3ac86ce2-3666-4358-bbdf-d1777fce9412",
      item_name: "",
      mealplan: [
        {
          address: {},
          isDelivery: false,
          meal_type: "breakfast",
          notes: "",
          order_dates: [],
          price: 0,
          variants: {
            name: "",
            sale_val: 0,
            items: [],
          },
        },
        {
          address: {},
          isDelivery: false,
          meal_type: "lunch",
          notes: "",
          order_dates: [],
          price: 0,
          variants: {
            name: "",
            sale_val: 0,
            items: [],
          },
        },
        {
          address: {},
          isDelivery: false,
          meal_type: "dinner",
          notes: "",
          order_dates: [],
          price: 0,
          variants: {
            name: "",
            sale_val: 0,
            items: [],
          },
        },
      ],
      qty: 0,
      sale_val: 0,
    },
  });

  useEffect(() => {
    if (id) {
      productID = id;
    } else {
      productID = productId;
    }
    setValue("item_id", productID);
    setValue("qty", 1);

    dispatch(getProductDetails(productID));
  }, [id, productId]);

  useEffect(() => {
    setProductDetails(products.productDetails);
    
  }, [products.productDetails]);

  useEffect(() => {
    let ifExist = Cart.cartItemList.filter(
      (item) => item.item == products.productDetails.id
    );
    if (ifExist.length) {
      setExistingProduct(ifExist[0] || { qty: 0 });
    }
    console.log("onIncerement", ifExist);
  }, [products.productDetails, Cart.cartItemList]);

  const handleCartClick = async (data) => {
    console.log("DATA-->", data);
    // let ifExist = Cart.cartItemList.filter(
    //   (item) => item.item == ProductDetails.id
    // );
    // setExistingProduct(ifExist[0] || { qty: 0 });
    // if (ifExist.length) {
    //   dispatch(
    //     updateCardItem({
    //       productId: ExistingProduct.id,
    //       qty: ifExist[0].qty + 1,
    //       sub_data: data.subscription_data,
    //     })
    //   );
    // } else {
    //   dispatch(
    //     addCardItem({
    //       item: ProductDetails.id,
    //       cart: Cart.cartDetails.id,
    //       qty: 1,
    //       sub_data: data.subscription_data,
    //     })
    //   );
    // }
    // console.log("FormDATAAAA", FormData);
  };
  const onIncrement = () => {
    console.log("onIncerement", ExistingProduct);
    dispatch(
      updateCart({ cartId: Cart.cartDetails.id, qty: Cart.cartDetails.qty + 1 })
    );
    dispatch(
      updateCardItem({
        productId: ExistingProduct.id,
        qty: ExistingProduct.qty + 1,
      })
    );
  };

  const onDecrement = () => {
    dispatch(
      updateCart({ cartId: Cart.cartDetails.id, qty: Cart.cartDetails.qty - 1 })
    );
    dispatch(
      updateCardItem({
        productId: ExistingProduct.id,
        qty: ExistingProduct.qty - 1,
      })
    );
  };

  const CheckIfExistInCart = () => {
    let ItemExist = Cart.cartItemList.filter(
      (item) => item.item == ProductDetails.id
    );
    console.log("Cart.cartItemList", Cart.cartItemList, ItemExist);
    return ItemExist.length;
  };

  const handleChange = (key, value) => {
    console.log("key, value", key, value);
    if (key == "variants") {
      setFormData({ ...FormData, variant: { ...FormData.variant, ...value } });
    } else {
      setFormData({ ...FormData, [key]: value });
    }
  };

  return (
    <FormProvider {...methods}>
      <Container fluid>
        <Row>
          <Col sm={12} lg={6}>
            <p className="h4 mt-3">{ProductDetails.display_name}</p>
            <p className=" h6 text-muted">{ProductDetails.category}</p>

            <div
              style={{
                backgroundImage: `url(${
                  ProductDetails.defaultimg_url ||
                  "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                height: "250px",
              }}
            />
          </Col>
          <Col sm={12} lg={6}>
            <p className="mt-3">{ProductDetails.description}</p>
            <h1>
              <small className="text-muted col-12 h6">
                Including{" "}
                {String(ProductDetails.tax_methods)
                  .replace("Output", "")
                  .replace("-", "")}
              </small>
              <br />
              <BiRupee /> {ProductDetails.sale_val} / {ProductDetails.uom_name}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {products.productDetails.is_mealplan && (
              <ProductPlanner
                customerId={"578461ea-bc50-4d40-8c0a-5c4546abc2d7"}
                productId={""}
                data={products.productDetails}
                FormData={FormData}
                handleChange={handleChange}
                control={control}
              />
            )}
            {/* {!isOnboarding &&
              (ExistingProduct.qty ? (
                <InputGroup className="mb-3">
                  <Button variant="outline-secondary" onClick={onDecrement}>
                    <GrSubtract />
                  </Button>
                  <FormControl
                    aria-label="Example text with two button addons"
                    style={{ textAlign: "center" }}
                    value={ExistingProduct?.qty || ""}
                    type="number"
                    onChange={(ev) => setCartItem(ev.target.value)}
                  />

                  <Button variant="outline-secondary" onClick={onIncrement}>
                    <GrAdd />
                  </Button>
                </InputGroup>
              ) : (
                <Button
                  className="w-100"
                  onClick={handleSubmit((data) => handleCartClick(data))}
                  // onClick={handleSubmit((d) => console.log("DATA_DETAILS", d))}
                >
                  <AiOutlineShoppingCart />
                  {"  "}Add to Cart
                </Button>
              ))} */}
          </Col>
        </Row>
        <div style={{ display: "block", height: 20 }} />
      </Container>
    </FormProvider>
  );
};

export default ProductDetails;
