import { Fragment } from "react";
import { StyledCardSection } from "..";
import EventCard from "../../components/EventCard";
import Footer from "../../components/Footer";
import { StyledMain } from "../../components/GlobalStyles";
import Header from "../../components/Header";

export default function Bookmarks({ sampleEvents, onToggleFavorite }) {
  const favEvents = sampleEvents.filter(
    (sampleEvent) => sampleEvent.isFavorite === true
  );
  return (
    <>
      <Header />
      <StyledMain>
        <StyledCardSection>
          {favEvents.map((favEvent) => (
            <Fragment key={favEvent.id}>
              <EventCard
                sampleEvent={favEvent}
                onToggleFavorite={onToggleFavorite}
              />
            </Fragment>
          ))}
        </StyledCardSection>
      </StyledMain>
      <Footer />
    </>
  );
}
