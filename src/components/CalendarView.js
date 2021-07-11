/* eslint-disable no-unused-vars */
import React from 'react'
import {
  WeeklyCalendar,
  WeeklyContainer,
  WeeklyDays,
  WeeklyBody,
  DefaultWeeklyEventItem,
} from '@zach.codes/react-calendar'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import Todo from './Todo'

const CalendarView = ({ data, searchTerm, completed }) => (
  <div className="border p-4 w-full">
    <WeeklyCalendar week={new Date('2021-07-11T07:00:00.000Z')}>
      <WeeklyContainer>
        <WeeklyDays />
        <WeeklyBody
          events={data
            .filter(
              (todo) =>
                (!searchTerm ||
                  todo.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) &&
                (!completed || todo.completed === completed),
            )
            .map((todo) => ({
              ...todo,
              date: new Date(todo.date),
            }))}
          renderItem={({ item, showingFullWeek }) => (
            <DefaultWeeklyEventItem
              key={item.id}
              title={item.title}
              date={
                showingFullWeek
                  ? format(item.date, 'MMM do k:mm')
                  : format(item.date, 'k:mm')
              }
            />
          )}
          style={{
            maxHeight: '26rem',
          }}
        />
      </WeeklyContainer>
    </WeeklyCalendar>
  </div>
)

CalendarView.propTypes = {
  data: PropTypes.array,
  searchTerm: PropTypes.string,
  completed: PropTypes.bool,
}

export default CalendarView
