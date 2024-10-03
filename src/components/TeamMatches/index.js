import React, { useEffect, useState } from "react";
import LatestMatch from "../LatestMatch";

const TeamMatches = (props) => {
  const [teamMatchesData, setTeamMatchesData] = useState({});

  const getTeamMatches = async () => {
    const { match } = props;
    const { params } = match;
    const { id } = params;

    const getFormattedData = (data) => ({
      umpires: data.umpires,
      result: data.result,
      manOfTheMatch: data.man_of_the_match,
      id: data.id,
      date: data.date,
      venue: data.venue,
      competingTeam: data.competing_team,
      competingTeamLogo: data.competing_team_logo,
      firstInnings: data.first_innings,
      secondInnings: data.second_innings,
      matchStatus: data.match_status,
    });

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`);
    const fetchedData = await response.json();
    const formattedData = {
      teamBannerURL: fetchedData.team_banner_url,
      latestMatch: getFormattedData(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map((eachMatch) =>
        getFormattedData(eachMatch)
      ),
    };
    setTeamMatchesData(formattedData);
  };

  useEffect(() => {
    getTeamMatches();
  },[]);

  return (
    <div className="responsive-container">
        <img src={teamMatchesData.teamBannerURL} alt="team banner"/>
     
      <LatestMatch latestMatchData={teamMatchesData.latestMatch} /> 
      {/* {renderRecentMatchesList()} */}
    </div>
  );
};

export default TeamMatches;
