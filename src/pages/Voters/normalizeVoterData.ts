import type {
  Voter,
  CreateVoterPayload,
} from "../../Redux/VoterSlice/voterSlice";

export function normalizeVoterData(
  data: Partial<Voter>
): Partial<CreateVoterPayload> {
  const {
    registeredPlace,
    newRegistrationPlace,
    desiredRegistrationPlace,
    ...rest
  } = data;

  return {
    ...rest,
    registeredPlace: registeredPlace ?? undefined,
    newRegistrationPlace: newRegistrationPlace ?? undefined,
    desiredRegistrationPlace: desiredRegistrationPlace ?? undefined,
  };
}
