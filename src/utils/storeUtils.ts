import { bindActionCreators, AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export function useActions<T>(actions: T, deps: AnyAction[]): T {
  const dispatch = useDispatch();
  return useMemo(
    // @ts-ignore
    () => bindActionCreators(actions, dispatch),
    deps ? [dispatch, ...deps] : [dispatch],
  );
}
