import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { BsPencil, BsTrash, BsTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getCartSummary } from "../../store/actions/cart";
import { deleteCartItem } from "../../store/actions/cart-item";

const CartSummaryItem = ({ ProductDetails, pindex }) => {
  const history = useHistory();
  const Cart = useSelector((state) => state.Cart);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();
  const [isExpanded, setisExpanded] = useState(false);

  const [Addresses, setAddresses] = useState({
    B: "",
    L: "",
    D: "",
  });

  const [mealItem, setMealItem] = useState(false);
  const [mealType, setMealType] = useState("");
  const [Duration, setDuration] = useState(null);
  const onDelete = (pindex) => {
    dispatch(
      deleteCartItem({
        cart_item_id: Cart?.cartDetails?.items[pindex].ciid,
        id: Cart?.cartDetails?.items[pindex]?.id,
        customer_id: userDetails.sub,
      })
    );
  };

  useEffect(() => {
    let temp = { ...Addresses };
    if (ProductDetails.subscription && ProductDetails.subscription.length) {
      setMealItem(true);
    } else {
      setMealItem(false);
    }
    ProductDetails?.subscription?.map((item, index) => {
      if (item.isDelivery) {
        temp[item?.meal_type] =
          item.address.tag +
          ":" +
          item.address.aline1 +
          ", " +
          item.address.aline2 +
          ", " +
          item.address.landmark +
          ", " +
          item.address.city +
          ", " +
          item.address.postalcode;
      } else {
        temp[item?.meal_type] = "Pickup";
      }

      if (item.meal_type) {
        setMealType(item.meal_type);
      }
    });
    setAddresses(temp);

    ProductDetails?.variants?.map((item) => {
      if (item.display_name == "Duration") {
        setDuration(item.items[0].display_name);
      }
    });
  }, [ProductDetails]);

  return (
    <div className="w-100p">
      <Card className="my-1 bg-1">
        <Card.Body className="p-1 d-flex flex-row align-items-start justify-content-between">
          <div className="cart-list-image-container">
            <img
              src={
                ProductDetails.defaultimg_url ||
                "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
              }
              alt="img"
            />
          </div>
          <div style={{ width: "calc(100% - 7rem)" }}>
            <Card.Text className="cart-list-product-detailes-name mb-0 clr-black">
              {ProductDetails.item_name}
            </Card.Text>
            <p className="cart-list-product-detailes-despname m-0 col-12 ff-4 clr-secondary">
              {ProductDetails.category}
            </p>
            <p className="col-12 ff-4 clr-black cart-list-product-detailes-attribute-kind mb-0">
              Including{" "}
              {String(ProductDetails.tax_methods)
                .replace("GST", "GST ")
                .replace("OUTPUT", " %")
                .replace("-", "")}
            </p>
            <p className="cart-list-product-detailes-attribute-kind mb-2">
              Tax {ProductDetails?.tax_amount} Includes{" "}
            </p>
            <p className="ff-2 clr-black mb-0 d-flex justify-content-between">
              <div className="ff-2 mb-0 cart-list-product-detailes-sale-price">
                <BiRupee />
                {ProductDetails.sub_total}
              </div>
            </p>

            {mealItem && isExpanded && (
              <div>
                <span style={{ fontSize: 12, fontWeight: 600 }}>
                  Subscribed for {Duration}
                </span>
                {Addresses.B && (
                  <div className="d-flex flex-column my-2">
                    <span style={{ fontSize: 12 }} className="text-muted">
                      Breakfast Address
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {Addresses.B}
                    </span>
                  </div>
                )}

                {Addresses.L && (
                  <div className="d-flex flex-column mb-2">
                    <span style={{ fontSize: 12 }} className="text-muted">
                      Lunch Address
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {Addresses.L}
                    </span>
                  </div>
                )}
                {Addresses.D && (
                  <div className="d-flex flex-column my-2">
                    <span style={{ fontSize: 12 }} className="text-muted">
                      Dinner Address
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {Addresses.D}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card.Body>
        <Card.Footer
          style={{
            padding: 5,
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItem: "center",
            background: "rgba(245, 224, 188, 1) !important",
          }}
        >
          <Button
            style={{
              borderRadius: "50%",
              marginLeft: 10,
              color: "#424141",
              borderColor: "#424141",
              display: "flex",
              alignItems: "center",
              width: "30px",
              height: "30px",
            }}
            variant="outline-danger"
            size="sm"
            onClick={() => history.push("/cart")}
          >
            <BsPencil />
          </Button>
          {mealItem && (
            <div>
              {isExpanded ? (
                <span
                  variant="link"
                  className="w-100 text-center clr-black"
                  onClick={() => setisExpanded(false)}
                >
                  <AiFillCaretUp /> view less
                </span>
              ) : (
                <span
                  variant="link"
                  className="w-100 text-center clr-black"
                  onClick={() => setisExpanded(true)}
                >
                  <AiFillCaretDown /> view more
                </span>
              )}
            </div>
          )}
          <div
            style={{
              borderRadius: "50%",
              display: "inline-flex",
            }}
          >
            <Button
              style={{
                borderRadius: "50%",
                marginLeft: 10,
                color: "#424141",
                borderColor: "#424141",
                display: "flex",
                alignItems: "center",
                width: "30px",
                height: "30px",
              }}
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(pindex)}
            >
              <BsTrashFill />
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CartSummaryItem;
