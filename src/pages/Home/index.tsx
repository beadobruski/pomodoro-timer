/* eslint-disable */

import { createContext, useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

import { HandPalm, Play } from 'phosphor-react';
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CycleContextType {
  activeCycle: Cycle | undefined;
  activeCycleById: string | null;
  markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CycleContextType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleById, setActiveCycleById] = useState<string | null>(null);

  const activeCycle = cycles?.find((cycle) => cycle.id === activeCycleById);

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime());

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   };

  //   setCycles((state) => [...state, newCycle]);
  //   setActiveCycleById(id);

  //   setAmountSecondsPassed(0);

  //   reset();
  // }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleById) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    ),
      setActiveCycleById(null);
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleById) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  // const task = watch('task');
  // const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/ action="">
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleById, markCurrentCycleAsFinished }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" /*disabled={isSubmitDisabled}*/>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
