import { useState, useEffect } from 'react'
import { countDays } from '../../utils/dates'
import CalendarDays from './CalendarDays'
import CalendarMonths from './CalendarMonths'
import CalendarYears from './CalendarYears'

export default function Calendar({ ranges, pending, viewYear, viewMonth, onPrev, onNext, onJump, onDayClick, onValidate, onReset }) {
  const [pickerView, setPickerView] = useState('days')
  const [yearPage, setYearPage] = useState(() => Math.floor(viewYear / 16) * 16)

  useEffect(() => {
    setYearPage(Math.floor(viewYear / 16) * 16)
  }, [viewYear])

  const total = countDays(ranges)

  if (pickerView === 'months') {
    return (
      <CalendarMonths
        viewYear={viewYear}
        viewMonth={viewMonth}
        onJump={onJump}
        onSetView={setPickerView}
      />
    )
  }

  if (pickerView === 'years') {
    return (
      <CalendarYears
        viewYear={viewYear}
        viewMonth={viewMonth}
        yearPage={yearPage}
        onSetYearPage={setYearPage}
        onJump={onJump}
        onSetView={setPickerView}
      />
    )
  }

  return (
    <CalendarDays
      ranges={ranges}
      pending={pending}
      viewYear={viewYear}
      viewMonth={viewMonth}
      onPrev={onPrev}
      onNext={onNext}
      onSetView={setPickerView}
      onDayClick={onDayClick}
      onValidate={onValidate}
      onReset={onReset}
      total={total}
    />
  )
}
