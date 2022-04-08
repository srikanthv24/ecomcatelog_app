import React from "react";
import { Button, Card } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import QtyButtonGroup from "./QtyButtonGroup";
import "./cartItem.scss";
import {
  SESSION_TYPES,
  DELIVERY,
  DELIVER_TO,
  DELETE,
  SESSION_CODES,
} from "../../utils/constants";
import { displayCurrency } from "../../helpers/displayCurrency";

const CartItem = ({
  isMealItem,
  productIndex,
  itemId,
  loading,
  onQtyDecrement,
  onQtyIncrement,
  onDelete,
  isDelivery,
  duration,
  itemGrandTotal,
  selectedSessions,
  address,
  product,
}) => {
  const {
    defaultimg_url: imgUrl,
    item_name: productName,
    qty: quantity,
    base_price: itemPrice,
    tax_amount: itemTax,
    delivery_charge: itemDeliveryCharge,
    discount_amount: itemDiscount,
  } = product;
  return (
    <div className="w-100p p-2">
      <Card className="my-1 bg-1">
        <Card.Body className="p-1 d-flex flex-row align-items-start justify-content-between">
          <div className="crt-prd-img-container">
            <img src={imgUrl} alt="img" />
          </div>
          <div className="cart-prd-details-sec">
            <p className="m-0 crt-price-info">
              <span>Price:</span>
              <span>{displayCurrency(itemPrice) || 0.0}</span>
            </p>
            <p className="m-0 crt-price-info">
              <span>GST: </span>
              <span>{displayCurrency(itemTax) || 0.0}</span>
            </p>
            <p className="m-0 crt-price-info">
              <span>Delivery: </span>
              <span>{displayCurrency(itemDeliveryCharge) || 0.0}</span>
            </p>
            <p className="m-0 px-2  prd-price-duration">{`(X ${duration})`}</p>
            <p className="m-0 crt-price-info">
              <span>Discount: </span>
              <span>{displayCurrency(itemDiscount) || 0.0}</span>
            </p>
            <p className="m-0 crt-price-info">
              <span>Total: </span>
              <span>{displayCurrency(itemGrandTotal) || 0.0}</span>
            </p>
          </div>
        </Card.Body>
        <Card.Body className="p-1 d-flex flex-row align-items-start justify-content-between">
          <div>
            <Card.Text className="crt-prd-title mb-0 clr-black">
              {productName}
            </Card.Text>
            {isMealItem ? (
              <p className="m-0">
                <span className="crt-prd-duration">{duration}</span>
              </p>
            ) : null}
          </div>
          <div className="d-flex align-items-center">
            <span className="px-2">Qty</span>
            <QtyButtonGroup
              productIndex={productIndex}
              itemId={itemId}
              quantity={quantity}
              loading={loading}
              onQtyDecrement={onQtyDecrement}
              onQtyIncrement={onQtyIncrement}
            />
          </div>
        </Card.Body>
        <Card.Body className="p-1 d-flex flex-row align-items-start justify-content-between">
          {isMealItem ? (
            <>
              <div>
                <p
                  className={`crt-prd-session m-0 ${
                    selectedSessions?.includes(SESSION_CODES.B) ? "" : DELETE
                  }`}
                >
                  {SESSION_TYPES.B}
                </p>
                <p className="crt-prd-session-deliver m-0">
                  {isDelivery && selectedSessions?.includes(SESSION_CODES.B)
                    ? DELIVERY
                    : ""}
                </p>
              </div>
              <div>
                <p
                  className={`crt-prd-session m-0 ${
                    selectedSessions?.includes(SESSION_CODES.L) ? "" : DELETE
                  }`}
                >
                  {SESSION_TYPES.L}
                </p>
                <p className="crt-prd-session-deliver m-0">
                  {isDelivery && selectedSessions?.includes(SESSION_CODES.L)
                    ? DELIVERY
                    : ""}
                </p>
              </div>
              <div>
                <p
                  className={`crt-prd-session m-0 ${
                    selectedSessions?.includes(SESSION_CODES.D) ? "" : DELETE
                  }`}
                >
                  {SESSION_TYPES.D}
                </p>
                <p className="crt-prd-session-deliver m-0">
                  {isDelivery && selectedSessions?.includes(SESSION_CODES.D)
                    ? DELIVERY
                    : ""}
                </p>
              </div>
            </>
          ) : (
            <div></div>
          )}

          <div>
            <Button
              className="delete-button"
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(productIndex)}
            >
              <BsTrashFill />
            </Button>
          </div>
        </Card.Body>
        {isMealItem && isDelivery && (
          <Card.Footer className="cart-summary-footer">
            <p className="crt-prd-address-title m-0">
              {DELIVER_TO}
            </p>
            <p>{address}</p>
          </Card.Footer>
        )}
      </Card>
    </div>
  );
};

export default CartItem;
