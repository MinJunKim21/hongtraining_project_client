import { useEffect, useState } from 'react';
import Axios from 'axios';
import MatchingListInTime from './MatchingListInTime';

function InTimeList({ startDate, endDate, nextDate }) {
  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    Axios.get('https://muddy-cowboy-boots-worm.cyclic.app/read').then(
      (response) => {
        setPeopleList(response.data);
      }
    );
  }, []);

  let inTimePeopleList = [];
  const makeInTimeList = (e) => {
    for (let i = 0; i < peopleList.length; i++) {
      if (
        new Date(peopleList[i].createdAt) <= new Date(nextDate) &&
        new Date(peopleList[i].createdAt) >= new Date(startDate)
      ) {
        inTimePeopleList.push(peopleList[i]);
      }
    }

    return inTimePeopleList;
  };
  makeInTimeList();

  return (
    <div className="">
      <span>설정된 기간내 지원자 리스트만</span>
      {inTimePeopleList.map((val, key) => {
        return (
          <div key={key} className="flex flex-col ">
            <div className="flex text-xs ">
              <h1 className="min-w-[100px]">{val.peopleName}</h1>
              <h1 className="min-w-[50px]">{val.gender}</h1>
              <h1 className="min-w-[50px]">{val.partnerGender}</h1>
              <h1 className="min-w-[50px]">{val.healthExperience}</h1>
              <h1 className="min-w-[50px]">{val.partnerExperience}</h1>
              <h1 className="min-w-[100px]">
                {new Date(val.createdAt) < new Date(nextDate)
                  ? new Date(val.createdAt).toLocaleDateString()
                  : '지원 기간 넘음'}
              </h1>
              <h1 className="min-w-[100px]">{val.whyVolunteer}</h1>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="변경할 연락처"
                  onChange={(e) => {
                    setNewPeopleName(e.target.value);
                  }}
                />
                <div onClick={() => updatePeople(val._id)}>update</div>
                <div onClick={() => deletePeople(val._id)}>delete</div>
              </div>
            </div>
          </div>
        );
      })}
      <MatchingListInTime
        startDate={startDate}
        endDate={endDate}
        nextDate={nextDate}
      />
    </div>
  );
}

export default InTimeList;
