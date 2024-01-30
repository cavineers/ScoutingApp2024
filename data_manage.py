import json
import os
import scoutingutil
from scoutingutil import Column, configs, Table, SheetsService

END_AUTO = "end-auto"

DIR = os.path.dirname(__file__)
SUBMISSIONS_FILE = os.path.join(DIR, "submissions.txt")

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

def handle_upload(raw:"dict[str]"):
    "Handle data sent to the upload route"
    #TODO use scoutingutil stuff

def save_local(raw:"dict[str]|str"):
    "Save (append) the raw data to a local file."
    if not isinstance(raw, str):
        raw = json.dumps(raw)
    with open(SUBMISSIONS_FILE, "a" if os.path.isfile(SUBMISSIONS_FILE) else "w") as f:
        f.write(raw+"\n")
        
#TODO: add constants here

def count_column_auto(ctx:scoutingutil.ProcessingContext):
    return sum(1 for _ in iter_auto(ctx.data, ctx.raw))

def count_column_teleop(ctx:scoutingutil.ProcessingContext):
    return sum(1 for _ in iter_teleop(ctx.data, ctx.raw))

class ScoutingData(Table):
    #home page
    date = Column("DATE", "date")
    robot = Column("ROBOT", "robot")
    team = Column("TEAM", "team")
    match = Column("MATCH", "match", process_data=lambda ctx: int(ctx.data), strict=True)
    scouter = Column("SCOUTER", "scouter")
    #prematch page
    startingpos = Column("STARTING POSITION", "startingpos") #figure this out later, actually figure this all out later
    #auto page
    picked_up_note_auto = Column("AUTO:PICKED UP NOTE", "auto_picked_up_note", process_data=count_column_auto)
    missed_shot_auto = Column("AUTO:MISSED SHOT", "auto_missed_shot", process_data=count_column_auto)
    dropped_note_auto = Column("AUTO:DROPPED NOTE", "auto_dropped_note", process_data=count_column_auto)
    #teleop page
    picked_up_note = Column("PICKED UP NOTE", "picked_up_note", process_data=count_column_teleop)
    missed_shot = Column("MISSED SHOT", "missed_shot", process_data=count_column_teleop)
    dropped_note = Column("DROPPED NOTE", "dropped_note", process_data=count_column_teleop)
    defense = Column("DEFENSE", "defense", process_data=count_column_teleop)
    #stage page
    stage_state = Column("STAGE STATE", "stage_state")
    harmony = Column("HARMONY", "harmony") 
    spotlit = Column("SPOTLIT", "spotlit") 
    #result page
    comments = Column("COMMENTS", "comments")
    #done
    