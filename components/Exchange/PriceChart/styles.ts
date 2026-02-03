import { StyleSheet } from 'react-native';
import { colorMaps } from '../../tokens';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    flex: 1,
    zIndex: 10,
  },
  labelContainer: {
    position: 'absolute',
    bottom: '100%',
    marginBottom: -12,
    width: 150,
    marginLeft: -75,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  label: {
    color: colorMaps.face.primary,
    textAlign: 'center',
  },
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: colorMaps.object.primary.bold.default,
    position: 'relative',
    overflow: 'hidden',
  },
  loadingText: {
    color: colorMaps.face.primary,
    textAlign: 'center',
    marginTop: 150,
  },
});
