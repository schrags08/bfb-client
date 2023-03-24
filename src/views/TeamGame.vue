<template>
  <q-page>
    <div class="team-game q-ma-md">
      <div class="actions">
        <div class="row q-gutter-md">
          <div class="col">
            <q-file
              v-model="file"
              label="Import Standings"
              color="primary"
              filled
            >
              <template v-slot:prepend>
                <q-icon name="upload" />
              </template>
            </q-file>
          </div>
          <div class="col">
            <q-input
              label="Max Lanes at Bowling Alley"
              v-model.number="maxLanes"
              min="1"
              max="500"
              type="number"
              outlined
              :disable="!hasData"
            />
          </div>
          <div class="col">
            <q-select
              outlined
              v-model="startLane"
              :options="startLaneOptions"
              label="Starting Lane"
              :disable="!hasData"
            />
          </div>
        </div>
        <div class="row justify-between q-my-md">
          <div class="col">
            <span class="stats text-caption">
              <template v-if="!hasData">
                <span
                  >No data.
                  <a
                    href="https://lss.bowl.com/leagueStandingSheets/ViewSearchLeagueServlet"
                    target="_blank"
                    >Download a standings sheet</a
                  >
                  to start.</span
                >
              </template>
              <template v-else>
                <span>Teams: {{ teams.length }}</span> |
                <span>Bowlers: {{ bowlers.length }}</span>
              </template>
            </span>
          </div>
          <div class="col">
            <div class="loader">
              <q-spinner-puff v-if="loading" color="primary" />
            </div>
          </div>
        </div>
      </div>
      <div class="my-card">
        <q-card flat bordered class="lane" v-for="(lane, i) in lanes" :key="i">
          <q-card-section>
            <div class="row q-gutter-md">
              <div class="col">
                <div class="text-h6">Lane {{ lane }}</div>
                <div class="text-caption">{{ dateFormatted }}</div>
              </div>
              <div class="col">
                <q-select
                  outlined
                  v-model="laneAssignments[i]"
                  :options="teamOptions"
                  label="Team"
                  emit-value
                  dense
                  clearable
                />
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-markup-table flat bordered dense>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-right">Instant</th>
                  <th class="text-right">30 Clean</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(b, bi) in bowlersByTeam[laneAssignments[i]]"
                  :key="bi"
                >
                  <td class="text-left text-bold">{{ b.name }}</td>
                  <td class="text-center">☐</td>
                  <td class="text-center">☐</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import _ from "lodash-core";
import { getBowlersFromStandingsFile } from "@/apis/standings-service";

export default {
  name: "TeamGameView",
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      loading: false,
      maxLanes: 84,
      file: null,
      teams: [],
      bowlers: [],
      startLane: 1,
      laneAssignments: [],
      date: new Date(),
    };
  },
  computed: {
    hasData() {
      const { teams, bowlers } = this;

      return teams.length > 0 && bowlers.length > 0;
    },
    maxStartLane() {
      const { teams, maxLanes } = this;

      return maxLanes - teams.length + 1;
    },
    startLaneOptions() {
      const { maxStartLane } = this;

      return Array(maxStartLane)
        .fill()
        .map((_, i) => i + 1);
    },
    lanes() {
      const { startLane, teams } = this;

      return Array(teams.length)
        .fill()
        .map((_, i) => i + startLane);
    },
    teamOptions() {
      const { teams, laneAssignments } = this;

      return teams.map((t) => {
        const { id, desc, name } = t;
        const label = `${desc} - ${name}`;

        return {
          label,
          value: id,
          disable: laneAssignments.includes(id),
        };
      });
    },
    bowlersByTeam() {
      const { bowlers } = this;

      return _.groupBy(bowlers, "teamId");
    },
    dateFormatted() {
      return new Intl.DateTimeFormat("en-US").format(this.date);
    },
  },
  watch: {
    file(val) {
      console.debug("watch file", val);

      this.loading = true;

      getBowlersFromStandingsFile(val)
        .then((parsedStandings) => {
          const { teams, bowlers } = parsedStandings;

          console.debug("import new teams", teams);
          console.debug("import new bowlers", bowlers);

          this.teams = Object.freeze(teams);
          this.bowlers = Object.freeze(bowlers);
          this.laneAssignments = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss">
.team-game {
  width: 1054px;
  min-width: 1054px;
  margin-left: auto;
  margin-right: auto;
}

.my-card {
  height: 816px;
  min-height: 816px;
}

.lane {
  display: inline-block;
  width: 340px;
  margin: 0 17px 17px 0;
}

.lane:nth-child(3n) {
  margin-right: 0;
}

.lane .q-card__section:last-child {
  min-height: 235px;
}

.loader {
  text-align: right;
}

@media print {
  @page {
    size: landscape;
  }

  .bfb__team-game {
    margin-top: 0;
    margin-bottom: 0;
  }

  .actions {
    display: none;
  }

  .lane:nth-child(6n) {
    page-break-after: always;
  }

  .q-select .q-field__marginal {
    visibility: hidden;
  }
}
</style>
