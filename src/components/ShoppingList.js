import React, { useState } from "react";
import EditItem from "./EditItem";
import {
  Label,
  WarningLabel,
  Input,
  Button,
  EditButton,
  DisplayContainer,
  DisplayPending,
  DisplayCrossedOff,
  Section,
  ItemsInCategory,
  PendingItem,
  EachItem,
  EachItemName,
  CrossedOffItem,
  CategoryHeader,
  ListHeader,
  AppHeader,
  Subtotal,
} from "./StyledCSS";

const ShoppingList = () => {
  const [itemName, setItemName] = useState("");
  const [category] = useState("Uncategorized");
  const [price] = useState(0);
  const [quantity] = useState(1);
  const [isCrossedOff] = useState(false);

  const [allItemsList, setAllItemsList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [activateEdit, setActivateEdit] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [warning, setWarning] = useState("");

  const toTitleCase = (str) => {
    str = str
      .toLowerCase()
      .split(" ")
      .map((eaWord) => eaWord[0].toUpperCase() + eaWord.slice(1))
      .join(" ");

    return str;
  };

  const clearScreen = () => {
    setWarning("");
    setActivateEdit(false);
  };

  const handleAddNew = (e) => {
    e.preventDefault();

    if (itemName) {
      const newItem = {
        itemName: toTitleCase(itemName),
        category,
        price,
        quantity,
        isCrossedOff,
      };

      const newList = allItemsList;
      newList.push(newItem);
      setDisplayList(newList);
      setAllItemsList(newList);

      setItemName("");
    } else {
      clearScreen();
      setWarning("Create Unsuccessful: No Item is Provided!");
    }
  };

  const handleSearch = (e) => {
    const searchedItems = allItemsList.filter((item) => {
      return item.itemName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setDisplayList(searchedItems);
    setItemName(e.target.value);
  };

  const handleCrossOff = (e, selectedItem) => {
    e.preventDefault();
    clearScreen();

    const updatedCrossedOff = allItemsList.map((item) =>
      item === selectedItem
        ? { ...selectedItem, isCrossedOff: !selectedItem.isCrossedOff }
        : item
    );

    setDisplayList(updatedCrossedOff);
    setAllItemsList(updatedCrossedOff);
  };

  const handleEditing = (e, selectedItem) => {
    e.preventDefault();
    clearScreen();

    setActivateEdit(true);
    setItemToEdit(selectedItem);
  };

  const handleUpdate = (origItem, updatedItem) => {
    const updatedList = allItemsList.map((item) =>
      item === origItem ? updatedItem : item
    );

    setAllItemsList(updatedList);
    setDisplayList(updatedList);
  };

  const calcSubtotal = displayList
    .filter((item) => item.isCrossedOff === false)
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  /**
   * creating a categorized display list
   * {
   *  "Fruit": [{item}, ...]
   *  "Dairy": [{item}, ...]
   *   ...
   * }
   */
  const categoriedDisplayList = displayList
    .filter((item) => item.isCrossedOff === false)
    .reduce((catObj, item) => {
      if (!catObj.hasOwnProperty(toTitleCase(item.category))) {
        catObj[toTitleCase(item.category)] = [];
      }
      catObj[toTitleCase(item.category)].push(item);
      return catObj;
    }, {});

  /**
   * sorted the categorized list into its own array list
   * ["Dairy", "Fruit", "Others"]
   */
  const sortedCategory = Object.keys(categoriedDisplayList).sort();

  return (
    <>
      <AppHeader>The Shopping List App</AppHeader>
      <form
        onSubmit={(e) => {
          handleAddNew(e);
        }}
      >
        <Label htmlFor="addItem"> Please search or create an item:</Label>
        <Input
          id="addItem"
          type="text"
          name="add"
          onChange={(e) => handleSearch(e)}
          onFocus={clearScreen}
          value={itemName}
        />

        <Button type="submit">Create</Button>
      </form>
      <WarningLabel>{warning}</WarningLabel>
      {activateEdit && (
        <EditItem
          item={itemToEdit}
          activateEdit={setActivateEdit}
          updateList={handleUpdate}
        />
      )}
      <DisplayPending>
        <ListHeader> Pending Items </ListHeader>
        {sortedCategory.map((cat, catIdx) => {
          return (
            <Section key={catIdx}>
              <CategoryHeader>{cat}</CategoryHeader>
              <ItemsInCategory>
                {categoriedDisplayList[cat]
                  .sort((a, b) => (a.itemName > b.itemName ? 1 : -1))
                  .map((item, itemIdx) => {
                    return (
                      <>
                        <PendingItem
                          key={itemIdx}
                          onClick={(e) => handleCrossOff(e, item)}
                        >
                          <EachItemName>{item.itemName}</EachItemName>
                          <EachItem>
                            Qty: {item.quantity ? item.quantity : "0"}
                          </EachItem>
                          <EachItem>
                            ${item.price ? item.price : "0"}/per
                          </EachItem>
                        </PendingItem>
                        <EditButton onClick={(e) => handleEditing(e, item)}>
                          Edit {item.itemName}
                        </EditButton>
                      </>
                    );
                  })}
              </ItemsInCategory>
            </Section>
          );
        })}
        {calcSubtotal > 0 && <Subtotal>Subtotal: ${calcSubtotal}</Subtotal>}
      </DisplayPending>
      <DisplayCrossedOff>
        <ListHeader> Crossed-Off Items </ListHeader>
        {displayList
          .filter((item) => item.isCrossedOff === true)
          .sort((a, b) => (a.itemName > b.itemName ? 1 : -1))
          .map((item, idx) => {
            return (
              <CrossedOffItem
                key={idx}
                onClick={(e) => handleCrossOff(e, item)}
              >
                <EachItemName>{item.itemName}</EachItemName>
                <EachItem>Qty: {item.quantity ? item.quantity : "0"}</EachItem>
                <EachItem>${item.price ? item.price : "0"}/per</EachItem>
              </CrossedOffItem>
            );
          })}
      </DisplayCrossedOff>
    </>
  );
};

export default ShoppingList;
