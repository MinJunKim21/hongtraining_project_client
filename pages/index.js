import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import Link from 'next/link';
import LandingPage from '../components/LandingPage';
import NotePop from '../components/NotePop';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { showFirstState } from '../atoms/modalAtom';

export default function Home() {
  const [peopleName, setPeopleName] = useState('');
  const [gender, setGender] = useState('man');
  const [newPeopleName, setNewPeopleName] = useState('');
  const [whyVolunteer, setWhyVolunteer] = useState('');
  const [partnerGender, setPartnerGender] = useState('man');
  const [healthExperience, setHealthExperience] = useState('basic');
  const [partnerExperience, setPartnerExperience] = useState('both');
  const [peopleList, setPeopleList] = useState([]);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [showFirst, setShowFirst] = useRecoilState(showFirstState);

  useEffect(() => {
    Axios.get('https://hongtrainingbe.herokuapp.com/read').then((response) => {
      setPeopleList(response.data);
    });
  }, [peopleList]);

  const addToList = () => {
    Axios.post('https://hongtrainingbe.herokuapp.com/insert', {
      peopleName: peopleName,
      gender: gender,
      partnerGender: partnerGender,
      healthExperience: healthExperience,
      partnerExperience: partnerExperience,
      whyVolunteer: whyVolunteer,
    });
    setTimeout(() => {
      pageRedirect();
    }, 500);
  };
  function pageRedirect() {
    window.location.href = '/ending';
  }

  const updatePeople = (id) => {
    Axios.put('https://hongtrainingbe.herokuapp.com/update', {
      id: id,
      newPeopleName: newPeopleName,
    });
  };

  const deletePeople = (id) => {
    Axios.delete(`https://hongtrainingbe.herokuapp.com/delete/${id}`, {
      id: id,
      newPeopleName: newPeopleName,
    });
  };

  return (
    <div className="flex flex-col mx-auto justify-center">
      <LandingPage />
      {showFirst && showModal && <NotePop />}
      {!showModal && (
        <div className="m-4">
          <span className="font-bold text-xl mt-4 mx-auto justify-center flex">
            홍트레이닝 시즌2
          </span>
          <form>
            <div className="">
              <label className="flex flex-col mt-8">
                매칭 결과 받을 전화 연락처 or 카카오톡 ID :
              </label>
              <input
                onChange={(e) => {
                  setPeopleName(e.target.value);
                }}
                type="text"
                placeholder=""
                className="border-b w-full mt-2"
              />
            </div>
            <div className="flex flex-col">
              <span className="mt-8 mb-2">본인 성별</span>
              <div className="flex space-x-2 ">
                <ul className="w-full">
                  <input
                    type="radio"
                    id="man"
                    name="gender"
                    value="man"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    className="peer sr-only"
                  />
                  <label
                    for="man"
                    className="flex p-2 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none  peer-checked:ring-[#E15162] peer-checked:ring-2 peer-checked:border-transparent mx-auto justify-center"
                  >
                    남자
                  </label>
                </ul>
                <ul className="w-full">
                  <input
                    type="radio"
                    id="woman"
                    name="gender"
                    value="woman"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    className="peer sr-only"
                  />
                  <label
                    for="woman"
                    className="flex p-2 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none  peer-checked:ring-[#E15162] peer-checked:ring-2 peer-checked:border-transparent
                  mx-auto justify-center 
              "
                    // onClick={() => {
                    //   nameInput.classList.add('hidden');
                    // }}
                  >
                    여자
                  </label>
                </ul>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mt-8 mb-2">희망하는 파트너 성별</label>
              <div className="flex space-x-2">
                <ul className="flex-1">
                  <input
                    type="radio"
                    id="both"
                    name="partnerGender"
                    value="both"
                    onChange={(e) => {
                      setPartnerGender(e.target.value);
                    }}
                    className="peer sr-only"
                  />
                  <label for="both" className="option_button">
                    상관없음
                  </label>
                </ul>
                <ul className="flex-1">
                  <input
                    type="radio"
                    id="partnerman"
                    name="partnerGender"
                    value="man"
                    onChange={(e) => {
                      setPartnerGender(e.target.value);
                    }}
                    className="peer sr-only"
                  />
                  <label for="partnerman" className="option_button">
                    남자
                  </label>
                </ul>
                <ul className="flex-1">
                  <input
                    type="radio"
                    id="partnerwoman"
                    name="partnerGender"
                    value="woman"
                    onChange={(e) => {
                      setPartnerGender(e.target.value);
                    }}
                    className="peer sr-only"
                  />
                  <label for="partnerwoman" className="option_button">
                    여자
                  </label>
                </ul>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mt-8 mb-2">본인 운동경력</label>
              <div className="flex space-x-2">
                <ul className="flex-1">
                  <input
                    type="radio"
                    id="basic"
                    name="healthExperience"
                    value="basic"
                    onChange={(e) => {
                      setHealthExperience(e.target.value);
                    }}
                    className="peer sr-only"
                  />
                  <label for="basic" className="option_button">
                    입문
                  </label>
                </ul>
                <ul className="flex-1">
                  <input
                    type="radio"
                    id="normal"
                    name="healthExperience"
                    value="normal"
                    onChange={(e) => {
                      setHealthExperience(e.target.value);
                    }}
                    className="peer sr-only"
                  />
                  <label for="normal" className="option_button">
                    보통
                  </label>
                </ul>
                <ul className="flex-1">
                  <input
                    type="radio"
                    id="expert"
                    name="healthExperience"
                    value="expert"
                    onChange={(e) => {
                      setHealthExperience(e.target.value);
                    }}
                    className="peer sr-only"
                  />
                  <label for="expert" className="option_button">
                    고수
                  </label>
                </ul>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mt-8 mb-2">희망하는 파트너 운동경력</label>
              <div className="flex space-x-2">
                <ul className="flex-1">
                  <input
                    type="radio"
                    id="partnerboth"
                    name="partnerHealthExperience"
                    value="both"
                    onChange={(e) => {
                      setPartnerExperience(e.target.value);
                    }}
                    className="peer sr-only"
                  />
                  <label for="partnerboth" className="option_button">
                    상관없음
                  </label>
                </ul>
                <ul className="flex-1">
                  <input
                    type="radio"
                    id="partnerbasic"
                    name="partnerHealthExperience"
                    value="basic"
                    onChange={(e) => {
                      setPartnerExperience(e.target.value);
                    }}
                    className="peer sr-only"
                  />
                  <label for="partnerbasic" className="option_button">
                    입문
                  </label>
                </ul>
                <ul className="flex-1">
                  <input
                    type="radio"
                    id="partnernormal"
                    name="partnerHealthExperience"
                    value="normal"
                    onChange={(e) => {
                      setPartnerExperience(e.target.value);
                    }}
                    className="peer sr-only"
                  />
                  <label for="partnernormal" className="option_button">
                    보통
                  </label>
                </ul>
                <ul className="flex-1">
                  <input
                    type="radio"
                    id="partnerexpert"
                    name="partnerHealthExperience"
                    value="expert"
                    onChange={(e) => {
                      setPartnerExperience(e.target.value);
                    }}
                    className="peer sr-only"
                  />
                  <label for="partnerexpert" className="option_button">
                    고수
                  </label>
                </ul>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mt-8">매칭을 신청해주신 이유 : </label>
              <input
                onChange={(e) => {
                  setWhyVolunteer(e.target.value);
                }}
                type="text"
                placeholder="짧게라도 부탁드려요!"
                className="border-b w-full mt-2 text-sm"
              />
            </div>
          </form>
          <button
            type="submit"
            onClick={addToList}
            className="cursor-pointer mt-24 from-[#E15162] to-[#EE7048] bg-gradient-to-tl w-full mx-auto justify-center text-white p-4 text-xl rounded-xl"
          >
            제출
          </button>
        </div>
      )}

      {/* <Link href="/manager">
        <span className="cursor-pointer">매니저 페이지 이동</span>
      </Link> */}
    </div>
  );
}
