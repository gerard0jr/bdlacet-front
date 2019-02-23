import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Results = ({results, searched}) => {
  return (<>
    {searched ? <div className="transition-test" style={{margin:"1rem 0 3rem 0"}}>
        
            {results ?
            <div className="results-quantity">
                 {results.length} resultados
            </div> : ''}
        {results && results !== [] ? results.map((result, k) => 
            <ExpansionPanel style={{width:"80%", margin: "0 auto", backgroundColor:"#f7f7f7", marginBottom:"10px"}}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{result ? result.title.slice(1,-1) : ''}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography style={{textAlign:"left"}}>
                        <p>Notas: {result.notes.slice(1,-1)}</p> 
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        ) : ''}   
    </div> : ''}
  </>)
}

export default Results