import { useState, useEffect } from 'react';
import axios from 'axios';
import MatchingList from '../components/MatchingList';
import Link from 'next/link';
import InTimeList from '../components/InTimeList';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms/modalAtom';

import { getCookie, removeCookies } from 'cookies-next';
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import Context, { myContext } from '../context/Context';
import { useContext } from 'react';

export default function Home() {
  const [peopleName, setPeopleName] = useState('');
  const [gender, setGender] = useState('man');
  const [newPeopleName, setNewPeopleName] = useState('');
  const [whyVolunteer, setWhyVolunteer] = useState('');
  const [partnerGender, setPartnerGender] = useState('man');
  const [healthExperience, setHealthExperience] = useState('basic');
  const [partnerExperience, setPartnerExperience] = useState('both');
  const [peopleList, setPeopleList] = useState([]);
  const [showMatching, setShowMatching] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [nextDate, setNextDate] = useState(new Date());
  const [user, setUser] = useRecoilState(userState);
  const context = useContext(myContext);

  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const handleSelect = (ranges) => {
    let selectedEndDate = ranges.selection.endDate;
    let nextDate = new Date(selectedEndDate);
    nextDate.setDate(selectedEndDate.getDate() + 1);
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    setNextDate(nextDate);
  };

  useEffect(() => {
    axios
      .get('https://muddy-cowboy-boots-worm.cyclic.app/read')
      .then((response) => {
        setPeopleList(response.data);
      });
  }, []);

  const addToList = () => {
    Axios.post('https://muddy-cowboy-boots-worm.cyclic.app/insert', {
      peopleName: peopleName,
      gender: gender,
      partnerGender: partnerGender,
      healthExperience: healthExperience,
      partnerExperience: partnerExperience,
      whyVolunteer: whyVolunteer,
    });
  };

  const updatePeople = (id) => {
    Axios.put('https://muddy-cowboy-boots-worm.cyclic.app/update', {
      id: id,
      newPeopleName: newPeopleName,
    });
  };

  const deletePeople = (id) => {
    Axios.delete(`https://muddy-cowboy-boots-worm.cyclic.app/delete/${id}`, {
      id: id,
      newPeopleName: newPeopleName,
    });
  };

  const handleLogout = () => {
    setUser(false);
  };

  const logout = () => {
    axios
      .get('https://muddy-cowboy-boots-worm.cyclic.app/auth/logout', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === 'done') {
          return {
            redirect: {
              destination: '/signin',
            },
          };
        }
      });
  };

  return (
    <div>
      {context && (
        <div className="flex flex-col justify-center m-4">
          <Link href="/">
            <span>????????? ??????</span>
          </Link>
          <div onClick={logout}>logout</div>

          <div className="flex flex-col overflow-x-scroll ">
            <h1 className="flex">?????? People List ??????</h1>
            <div className="flex text-xs border">
              <span className="min-w-[100px]">?????????</span>
              <span className="min-w-[50px]">??????</span>
              <span className="min-w-[50px]">????????? ??????</span>
              <span className="min-w-[50px]">??????</span>
              <span className="min-w-[50px]">?????? ??????</span>
              <span className="min-w-[100px]">?????? ??????</span>
              <span className="min-w-[100px]">?????? ??????</span>
            </div>
            {peopleList.map((val, key) => {
              return (
                <table key={key} className="flex flex-col ">
                  <tr className="flex text-xs border ">
                    <td className="min-w-[100px] border">{val.peopleName}</td>
                    <td className="min-w-[50px] border">{val.gender}</td>
                    <td className="min-w-[50px] border">{val.partnerGender}</td>
                    <td className="min-w-[50px] border">
                      {val.healthExperience}
                    </td>
                    <td className="min-w-[50px] border">
                      {val.partnerExperience}
                    </td>
                    <td className="min-w-[100px] border">
                      {new Date(val.createdAt).toLocaleDateString()}
                    </td>
                    <td className="min-w-[100px]">{val.whyVolunteer}</td>
                    <td className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="????????? ?????????"
                        onChange={(e) => {
                          setNewPeopleName(e.target.value);
                        }}
                      />
                      <td onClick={() => updatePeople(val._id)}>update</td>
                      <td onClick={() => deletePeople(val._id)}>delete</td>
                    </td>
                  </tr>
                </table>
              );
            })}
          </div>
          <div>
            <span>?????? ?????? ??????</span>
            <span>?????? ?????? ?????????</span>
            <div>
              <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date('2022-01-01T00:00:00')}
                rangeColors={['#E15162']}
                onChange={handleSelect}
              />
            </div>
          </div>

          <InTimeList
            startDate={startDate}
            endDate={endDate}
            nextDate={nextDate}
          />

          {/* <div
        onClick={() => setShowMatching(!showMatching)}
        className="cursor-pointer mt-24"
      >
        {!showMatching ? '?????? ?????? ??????' : '?????? ?????? ??????'}
      </div>
      {showMatching && <MatchingList />} */}
        </div>
      )}
    </div>
  );
}
