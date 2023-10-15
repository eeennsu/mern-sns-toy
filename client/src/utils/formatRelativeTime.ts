const formatRelativeTime = (date1: Date, date2: Date = new Date()): string => {

    if (!date1) {
        return '';
    }

    // date1 은 더 오래된 시간, date2는 현재 시간 or 최근 시간
    const diffInMilliseconds: number = date2.getTime() - date1.getTime();
    const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });

    // 1분 미만
    if (diffInMilliseconds < 60 * 1000) {                                               // 1분 미만일 땐 몇초 전
        const seconds = Math.floor(diffInMilliseconds / 1000);

        return rtf.format(-seconds, 'seconds');

    } else if (diffInMilliseconds < 60 * 60 * 1000) {                                   // 1시간 미만일 땐 몇분 전
        const minutes = Math.floor(diffInMilliseconds / (60 * 1000));

        return minutes === 2 ? '2분 전' : rtf.format(-minutes, 'minutes');

    } else if (diffInMilliseconds < 60 * 60 * 24 * 1000) {                              // 하루 미만일 땐 몇 시간 전
        const hours = Math.floor(diffInMilliseconds / (60 * 60 * 1000));
         
        return rtf.format(-hours, 'hours');

    } else if (diffInMilliseconds < 60 * 60 * 24 * 30 * 1000) {                         // 한달 미만일 땐 며칠전
        const days = Math.floor(diffInMilliseconds / (60 * 60 * 24 * 1000));

        return days === 2 ? '2일 전' : rtf.format(-days, 'days');

    } else if (diffInMilliseconds < 60 * 60 * 24 * 365 * 1000){                         // 1년 미만일 땐 몇달전
        const month = Math.floor(diffInMilliseconds / (60 * 60 * 24 * 30 * 1000));

        return rtf.format(-month, 'months');
    } else {                                                                            // 1년 이상일 땐...
        const years = Math.floor(diffInMilliseconds / (60 * 60 * 24 * 365 * 1000));

        return years === 1 ? '1년 전' : rtf.format(-years, 'years');
    }
}

export default formatRelativeTime;