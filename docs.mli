type Iso8601String := String
type TimezoneString := String

type TimezoneDate := {
    iso: Iso8601String,
    timezone?: TimezoneString
}

type IsoDate := {
    year: Number,
    month: NUmber,
    day: Number,
    hour: Number,
    minute: Number,
    second: Number,
    millisecond: Number,
    offset: String
}

type Timezone := {
    IsoString: (date: TimezoneData) => Iso8601String &
        (date: Iso8601String, timezone: String) => Iso8601String,
    format: (date: Iso8601String, formatter: String) => String,
    addMillisecond: (date: TimezoneData, amount: Number) => Iso8601String &
        (date: Iso8601String, timezone: TimezoneString, milliSeconds: Number)
            => Iso8601String,
    addSecond: (date: TimezoneData, seconds: Number) => Iso8601String &
        (date: Iso8601String, timezone: TimezoneString, seconds: Number)
            => Iso8601String,
    addMinute: (date: TimezoneData, minutes: Number) => Iso8601String &
        (date: Iso8601String, timezone: TimezoneString, minutes: Number)
            => Iso8601String,
    addHour: (date: TimezoneData, hours: Number) => Iso8601String &
        (date: Iso8601String, timezone: TimezoneString, hours: Number)
            => Iso8601String,
    addDay: (date: TimezoneData, days: Number) => Iso8601String &
        (date: Iso8601String, timezone: TimezoneString, days: Number)
            => Iso8601String,
    addWeek: (date: TimezoneData, weeks: Number) => Iso8601String &
        (date: Iso8601String, timezone: TimezoneString, weeks: Number)
            => Iso8601String,
    addMonth: (date: TimezoneData, months: Number) => Iso8601String &
        (date: Iso8601String, timezone: TimezoneString, months: Number)
            => Iso8601String,
    addYear: (date: TimezoneData, years: Number) => Iso8601String &
        (date: Iso8601String, timezone: TimezoneString, years: Number)
            => Iso8601String
}

browser-tz := (timezoneData: Object) => Timezone
browser-tz/iso-date/parse := (String) => IsoDate | null
browser-tz/iso-date/format := (IsoDate | Date, offset?: String) => String
browser-tz/moment/format := (MomentDate) => String
browser-tz/moment/parse := (TimezoneDate, isoDate?: IsoDate)
    => MomentDate | null
