import React, { useState } from "react";
import { Label, Input, Button } from "./StyledCSS";

const EditItem = ({item, updateList, activateEdit}) => {
  const [itemName, setItemName] = useState(item.itemName);
  const [category, setCategory] = useState(item.category);
  const [price, setPrice] = useState(item.price);
  const [quantity, setQuantity] = useState(item.quantity);
  const [isCrossedOff] = useState(item.isCrossedOff);

  const toTitleCase = (str) => {
    str = str
      .toLowerCase()
      .split(" ")
      .map((eaWord) => eaWord[0].toUpperCase() + eaWord.slice(1))
      .join(" ");
    return str;
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedItem = {
      itemName: toTitleCase(itemName),
      category: toTitleCase(category),
      price,
      quantity,
      isCrossedOff,
    };

    //passing both objs back to update lists
    updateList(item, updatedItem);
    //last steps remove edit component when finished
    activateEdit(false);
  };

  const handleCancelUpdate = () => {
    activateEdit(false);
  };

  return (
    <form onSubmit={(e) => handleUpdate(e)}>
      <Label htmlFor="itemName"> Item:</Label>
      <Input
        id="itemName"
        name="itemName"
        type="text"
        onChange={(e) => setItemName(e.target.value)}
        value={itemName}
      />

      <Label htmlFor="category"> Category:</Label>
      <Input
        id="category"
        name="category"
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />

      <Label htmlFor="price"> Price:</Label>
      <Input
        id="price"
        name="price"
        type="number"
        step="0.01"
        min="0.00"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />

      <Label htmlFor="quantity"> Quantity:</Label>
      <Input
        id="quantity"
        name="quantity"
        type="number"
        min="0"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />

      <Button type="submit">Update</Button>
      <Button onClick={handleCancelUpdate}>
        Cancel
      </Button>
    </form>
  );
};

export default EditItem;
