import React, { useEffect, useState } from "react";
import LatestMatch from "../LatestMatch";
import MatchCard from '../MatchCard'

import './index.css'

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

 const renderRecentMatchesList = () => {
    const {recentMatches} = teamMatchesData
    if (!recentMatches) return null 

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  useEffect(() => {
    getTeamMatches();
  },[props.match.params.id]);

  const getRouteClassName = () => {
    const {match} = props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  return (
    <div className={`team-matches-container ${getRouteClassName()}`}>
      <div className="responsive-container">
        <img src={ teamMatchesData.teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={ teamMatchesData.latestMatch} />
        {renderRecentMatchesList()}
      </div>
    </div>
  );
};

export default TeamMatches;
