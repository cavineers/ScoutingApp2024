from datetime import datetime, timedelta
import json
import os
import scoutingutil
from scoutingutil import Column, Table

START = "start"
END = "end"
END_AUTO = "end-auto"
MATCH_INPUT_NAMES = ("score", "move", "pickup", "dropped", "defend")

DIR = os.path.dirname(__file__)
SUBMISSIONS_FILE = os.path.join(DIR, "submissions.txt")

def parse_isodate(dstr:str):
    return datetime.fromisoformat(dstr.replace("Z", "+00:00"))

def iter_auto(data, raw:dict[str]):
    if data is None:
        return
    end_auto = raw[END_AUTO]
    for dt in data:
        if dt > end_auto:
            return
        yield dt

def iter_teleop(data, raw:dict[str]):
    if data is None:
        return
    end_auto = raw[END_AUTO]
    for dt in data:
        if dt > end_auto:
            yield dt
            
def prep_data(data:dict[str]):
    #set all iso datetime strings to datetime objects
    data[START] = parse_isodate(data[START])
    data[END] = parse_isodate(data[END])
    for name in MATCH_INPUT_NAMES:
        if isinstance(data[name], list):
            data[name] = [parse_isodate(dtstr) for dtstr in data[name] if isinstance(dtstr, str)]
    
    if data.get(END_AUTO) is None:
        new_end = data[START]+timedelta(seconds=45)
        #get which one happened earlier
        data[END_AUTO] = min(new_end, data[END])
    else:
        data[END_AUTO] = parse_isodate(data[END_AUTO])

def handle_upload(raw:"dict[str]"):
    "Handle data sent to the upload route"
    #TODO use scoutingutil stuff
    save_local(raw)

def save_local(raw:"dict[str]|str"):
    "Save (append) the raw data to a local file."
    if not isinstance(raw, str):
        raw = json.dumps(raw)
    with open(SUBMISSIONS_FILE, "a" if os.path.isfile(SUBMISSIONS_FILE) else "w") as f:
        f.write(raw+"\n")

def count_column_auto(ctx:scoutingutil.ProcessingContext):
    return sum(1 for _ in iter_auto(ctx.data, ctx.raw))

def count_column_teleop(ctx:scoutingutil.ProcessingContext):
    return sum(1 for _ in iter_teleop(ctx.data, ctx.raw))

class ScoutingData(Table):
    "Data on robot/human player's performance"
    
    #home page
    date = Column("DATE", "date")
    robot = Column("ROBOT", "robot")
    team = Column("TEAM", "team")
    match = Column("MATCH", "match", process_data=lambda ctx: int(ctx.data), strict=True)
    scouter = Column("SCOUTER", "scouter")
    #prematch page
    starting_piece = Column("STARTING  PIECE", "startingpiece")
    starting_position = Column("STARTING POSITION", "startingpos")
    #auto page
    picked_up_note_auto = Column("AUTO:PICKED UP NOTE", "pickup", process_data=count_column_auto)
    missed_shot_auto = Column("AUTO:MISSED SHOT", "missed", process_data=count_column_auto)
    dropped_note_auto = Column("AUTO:DROPPED NOTE", "dropped", process_data=count_column_auto)
    #teleop page
    picked_up_note = Column("PICKED UP NOTE", "pickup", process_data=count_column_teleop)
    missed_shot = Column("MISSED SHOT", "missed", process_data=count_column_teleop)
    dropped_note = Column("DROPPED NOTE", "dropped", process_data=count_column_teleop)
    defense = Column("DEFENSE", "defense", process_data=count_column_teleop)
    #stage page
    stage_state = Column("STAGE STATE", "stage")
    harmony = Column("HARMONY", "harmony") 
    spotlit = Column("SPOTLIT", "spotlit") 
    #result page
    comments = Column("COMMENTS", "comments")
    #done