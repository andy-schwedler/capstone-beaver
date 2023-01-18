import { useState } from "react";
import styled from "styled-components";
import { rearrangeDates } from "../../helpers/sortingLogic";
import EditForm from "../Forms/EditForm";
import { StyledButtonFrame, StyledLink } from "../GlobalStyles";
import MoreOptionsIcon from "../Icons/MoreOptionsIcon";
import OptionsMenu from "../OptionsMenu/OptionsMenu";

export default function MemoryListCard({
  sampleEvent,
  onToggleFavorite,
  onDelete,
  onEditMemory,
}) {
  const [displayOptionMenu, setDisplayOptionMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function handleCancelButton() {
    if (confirm("Are you sure you want to discard your unsaved changes?")) {
      setDisplayOptionMenu(false);
      setEditMode(false);
    }
    return;
  }
  function toggleDisplayOptionMenu() {
    setDisplayOptionMenu(!displayOptionMenu);
  }

  function handleToggleEditMode() {
    setEditMode(!editMode);
    toggleDisplayOptionMenu();
  }

  function handleEditSubmit(event) {
    event.preventDefault();

    const editedHeadline = event.target.headline.value;
    const editModeInput = { headline: editedHeadline };

    // //update on mongodb
    onEditMemory(editModeInput, sampleEvent.id);

    // user has to confirm changes made
    if (confirm("Are you sure you want to save your changes?"))
      handleToggleEditMode();
  }

  const formatDate = rearrangeDates(sampleEvent.date);

  return (
    <StyledMemoryContainer>
      <StyledButtonFrame
        name="options"
        aria-label="options"
        onClick={toggleDisplayOptionMenu}
      >
        <MoreOptionsIcon alt="options icon" fill="var(--beaver1)" width={20} />
      </StyledButtonFrame>
      {editMode ? (
        <EditForm
          sampleEvent={sampleEvent}
          onEditSubmit={handleEditSubmit}
          onToggleEdit={handleToggleEditMode}
          onToggleDisplay={toggleDisplayOptionMenu}
          onCancel={handleCancelButton}
        />
      ) : (
        <StyledLink aria-label="detailspage" href={`/${sampleEvent.id}`}>
          <p> {formatDate} </p>
          <h3>{sampleEvent.headline}</h3>
        </StyledLink>
      )}
      {displayOptionMenu && (
        <OptionsMenu
          onDelete={onDelete}
          onToggleEdit={handleToggleEditMode}
          onToggleDisplay={toggleDisplayOptionMenu}
          sampleEvent={sampleEvent}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </StyledMemoryContainer>
  );
}

export const StyledMemoryContainer = styled.article`
  width: 60vw;
  display: grid;
  grid-template-columns: repeat(3, auto);
  background-color: var(--beaver);
  border-radius: 0.3rem;
  color: #fefefe;
  align-self: center;
  margin-right: 0;
  margin-bottom: 1.1rem;

  a {
    text-align: left;
    margin-bottom: 0.8rem;
    padding: 0.3em;
    gap: 0.8em;
    display: flex;
    flex-direction: column;
  }

  h3 {
    font-weight: 400;
    margin: 0;
    padding: 0.3em;
  }

  button {
    grid-row-start: 1;
    grid-column-start: -1;
    justify-self: flex-end;
  }

  p {
    grid-column: 1 / 2;
    grid-row: 1;
    font-style: italic;
    font-size: small;
    opacity: 50%;
    margin: 0;
  }
`;
